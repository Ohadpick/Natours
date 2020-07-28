const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:bookingId', bookingController.getCheckoutSession);
router.post('/checkout-booking', bookingController.createBookingCheckout);
router.patch('/checkout-paid/:bookingId', bookingController.updatePaid);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(authController.restrictTo('admin', 'lead-guide'), bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(authController.restrictTo('admin', 'lead-guide'), bookingController.updateBooking)
  .delete(authController.restrictTo('admin', 'lead-guide'), bookingController.deleteBooking);

module.exports = router;
