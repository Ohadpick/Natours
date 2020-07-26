import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/_services/review.service';
import { APIResponse } from 'src/app/_models/apiResponse';
import { Review } from 'src/app/_models/review';
import { AuthService } from 'src/app/_services/auth.service';
import { APIParams } from 'src/app/_models/apiParams';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  reviews: Review[];
  apiParams: APIParams<Review> = new APIParams<Review>();

  constructor(private reviewsService: ReviewService, private authService: AuthService) { }

  ngOnInit() {
    this.getReviews();
  }

  getReviews(): void {
    this.apiParams.user = this.authService.currentUser._id;
    this.apiParams.sort = 'createdAt';

    this.reviewsService.getReviews(this.apiParams).subscribe((results: APIResponse<Review[]>) => {
      this.reviews = results.data.data;
    });
  }
}
