import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/_models/tour';
import { TourService } from '../../_services/tour.service';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/_models/apiResponse';
import { Review } from 'src/app/_models/review';
import { AuthService } from 'src/app/_services/auth.service';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {
  tour: Tour;

  constructor(private tourService: TourService, private router: Router, private authService: AuthService,
              public utilService: UtilService) { }

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
}
