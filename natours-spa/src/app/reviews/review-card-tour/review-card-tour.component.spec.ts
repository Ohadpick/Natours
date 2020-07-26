import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardTourComponent } from './review-card-tour.component';

describe('ReviewCardTourComponent', () => {
  let component: ReviewCardTourComponent;
  let fixture: ComponentFixture<ReviewCardTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewCardTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCardTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
