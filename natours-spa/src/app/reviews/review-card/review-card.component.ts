import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/_models/review';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  @Input() review: Review;

  constructor(public utilService: UtilService) { }

  ngOnInit(): void {
  }

  getReviewClass(review: Review, star: number) {
    const active = review.rating >= star ? 'active' : 'inactive';
    const reviewClass = 'reviews__star reviews__star--' + active;
    return reviewClass;
  }
}
