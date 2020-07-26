import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/_services/booking.service';
import { Booking } from 'src/app/_models/booking';
import { APIResponse } from 'src/app/_models/apiResponse';
import { AuthService } from 'src/app/_services/auth.service';
import { APIParams } from 'src/app/_models/apiParams';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  bookings: Booking[];
  apiParams: APIParams<Booking> = new APIParams<Booking>();

  constructor(private bookingService: BookingService, private authService: AuthService) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    this.apiParams.user = this.authService.currentUser._id;
    this.apiParams.sort = 'createdAt';

    this.bookingService.getBookings(this.apiParams).subscribe((results: APIResponse<Booking[]>) => {
      this.bookings = results.data.data;
    });
  }
}
