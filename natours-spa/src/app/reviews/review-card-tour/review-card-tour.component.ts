import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Review } from 'src/app/_models/review';
import { ReviewService } from 'src/app/_services/review.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-review-card-tour',
  templateUrl: './review-card-tour.component.html',
  styleUrls: ['./review-card-tour.component.css']
})
export class ReviewCardTourComponent implements OnInit {
  @Input() review: Review;
  @ViewChild('reviewForm', {static: true}) reviewForm: NgForm;

  editable = false;

  constructor(private reviewService: ReviewService, private alertify: AlertifyService, public utilService: UtilService) { }

  ngOnInit(): void {
  }

  getReviewClass(review: Review, star: number) {
    const active = review.rating >= star ? 'active' : 'inactive';
    const reviewClass = 'reviews__star reviews__star--' + active;
    return reviewClass;
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  updateReview() {
    this.reviewService.updateReview(this.review).subscribe (next => {
      this.alertify.success('Review update successfuly');
      this.reviewForm.reset(this.review);
    }, error => {
      this.alertify.error(error);
    });

    this.editable = false;
  }
}
