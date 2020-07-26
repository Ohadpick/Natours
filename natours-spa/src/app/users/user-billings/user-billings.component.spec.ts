import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBillingsComponent } from './user-billings.component';

describe('UserBillingsComponent', () => {
  let component: UserBillingsComponent;
  let fixture: ComponentFixture<UserBillingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBillingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
