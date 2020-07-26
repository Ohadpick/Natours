import { Component, OnInit, DebugEventListener } from '@angular/core';
import { BookingService } from 'src/app/_services/booking.service';
import { CheckoutSession } from 'src/app/_models/checkoutSession';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

declare const stripeBookTour: any;

@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.css']
})
export class BookTourComponent implements OnInit {
  sessionId: any;

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
    this.bookTour();
  }

  bookTour() {
    // const tourId = this.router.url.split('/')[2];
    // this.bookingService.getCheckoutSession(tourId).subscribe((response: CheckoutSession) => {
    //   const session = response.session.id;
    //   console.log('session', session);
    //   stripeBookTour(session);
    // });
  }

}

