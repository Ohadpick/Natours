import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/_models/tour';
import { UtilService } from 'src/app/_services/util.service';
import { Booking } from 'src/app/_models/booking';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit {
  @Input() tour: Tour;
  @Input() booking: Booking;

  constructor(public utilService: UtilService) { }

  ngOnInit(): void {
  }

  getCardClass() {
    if (this.booking) {
      return '';
    }
    return 'card mb-5 shadow bg-white rounded';
  }

  isPaid(): boolean {
    if (this.booking) {
      if (this.booking.paid) {
        return true;
      }
    }
    return false;
  }

}
