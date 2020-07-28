import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/_models/tour';
import { Booking } from 'src/app/_models/booking';
import { TourService } from '../../_services/tour.service';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/_models/apiResponse';
import { Review } from 'src/app/_models/review';
import { AuthService } from 'src/app/_services/auth.service';
import { UtilService } from 'src/app/_services/util.service';
import { BookingService } from 'src/app/_services/booking.service';
import { CheckoutSession } from 'src/app/_models/checkoutSession';
import { loadStripe } from '@stripe/stripe-js';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {
  tour: Tour;

  constructor(private tourService: TourService, private router: Router, private authService: AuthService,
              public utilService: UtilService, private bookingService: BookingService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.getTour();
  }

  getTour(): void {
    const slug = this.router.url.split('/')[2];
    this.tourService.getTourBySlug(slug).subscribe((response: APIResponse<Tour[]>) => {
      const value: any = response.data.data;
      this.tour = value;
    });
  }

  getReviewClass(review: Review, star: number) {
    const active = review.rating >= star ? 'active' : 'inactive';
    const reviewClass = 'reviews__star reviews__star--' + active;
    return reviewClass;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  async getCheckoutSession() {
    this.bookingService.getCheckoutSession(this.tour._id).subscribe((response: CheckoutSession) => {
      const sessionId = response.session.id;
      console.log('session', sessionId);

      return sessionId;
    });
  }

  async bookTour() {
    const booking: Booking = { tour: this.tour, user: this.authService.currentUser, price: this.tour.price };

    this.bookingService.addBooking(booking).subscribe(async (response: APIResponse<Booking>) => {
      const bookingId = response.data.data._id;

      const stripePromise  = await loadStripe(environment.stripe);

      this.bookingService.getCheckoutSession(bookingId).subscribe(async (response: CheckoutSession) => {
        const sessionId = response.session.id.toString();

        const stripe = await stripePromise;

        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });
      });

    });
  }

}
