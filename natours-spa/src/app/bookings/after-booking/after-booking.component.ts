import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/_models/booking';
import { BookingService } from 'src/app/_services/booking.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-after-booking',
  templateUrl: './after-booking.component.html',
  styleUrls: ['./after-booking.component.css']
})
export class AfterBookingComponent implements OnInit {

  constructor(private bookingService: BookingService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.addBooking();
  }

  addBooking() {
    debugger;
    const bookId = this.router.url.split ('/')[2];
    this.bookingService.updatePaid(bookId).subscribe(response => {
      debugger;
      this.alertify.success(`Tour succesfully booked`);
      this.router.navigate(['/']);
    });
  }

}
