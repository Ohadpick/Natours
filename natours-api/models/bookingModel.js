const mongoose = require('mongoose');

const bookingScema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Booking must belong to Tour!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to User!'],
    },
    price: {
      type: Number,
      require: [true, 'Booking must have a price.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingScema.pre(/^find/, function (next) {
  this.populate('user');

  this.populate({
    path: 'tour',
    select: '-secretTour -guides -durationWeeks',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingScema);

module.exports = Booking;
