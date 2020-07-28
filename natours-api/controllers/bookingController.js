const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const booking = await Booking.findById(req.params.bookingId);

  const tour = await Tour.findById(booking.tour._id);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    // cancel_url: `${req.protocol}://${req.get('host')}/${tour.slug}`,
    success_url: `http://localhost:4200/bookings/${booking._id}`,
    cancel_url: `http://localhost:4200/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/tour-1-cover.jpg`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });
  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only temporary, because it's unsecure: everyone can make booking without paying!
  const { tour, user, price } = req.body;

  if (!tour || !user || !price) return next();

  const booking = await Booking.create({ tour, user, price });

  res.status(200).json({
    status: 'success',
    data: {
      data: booking,
    }
  });
  //res.redirect(req.originalUrl.split('?')[0]);
});

exports.updatePaid = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingId);
  booking.paid = true;

  const doc = await Booking.findByIdAndUpdate(req.params.bookingId, booking, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    }
  });
})

exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

