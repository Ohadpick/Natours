import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertifyService } from './_services/alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxStarRatingModule } from 'ngx-star-rating';

import { NavbarComponent } from './utils/navbar/navbar.component';
import { FooterComponent } from './utils/footer/footer.component';
import { TourListComponent } from './tours/tour-list/tour-list.component';
import { TourDetailComponent } from './tours/tour-detail/tour-detail.component';
import { UserService } from './_services/user.service';
import { TourService } from './_services/tour.service';
import { TourCardComponent } from './tours/tour-card/tour-card.component';
import { MapComponent } from './utils/map/map.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserSettingsComponent } from './users/user-settings/user-settings.component';
import { UserBookingsComponent } from './users/user-bookings/user-bookings.component';
import { UserReviewsComponent } from './users/user-reviews/user-reviews.component';
import { UserBillingsComponent } from './users/user-billings/user-billings.component';
import { SidebarComponent } from './utils/sidebar/sidebar.component';
import { ReviewCardComponent } from './reviews/review-card/review-card.component';
import { ReviewCardTourComponent } from './reviews/review-card-tour/review-card-tour.component';
import { AfterBookingComponent } from './bookings/after-booking/after-booking.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TourListComponent,
    TourDetailComponent,
    TourCardComponent,
    MapComponent,
    LoginComponent,
    SignupComponent,
    UserSettingsComponent,
    UserBookingsComponent,
    UserReviewsComponent,
    UserBillingsComponent,
    SidebarComponent,
    ReviewCardComponent,
    ReviewCardTourComponent,
    AfterBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    JwtModule.forRoot({
      config: {
          tokenGetter,
          allowedDomains: ['localhost:3000', 'localhost:4200'],
          disallowedRoutes: ['localhost:3000/api/v1/auth']
      }
   })
  ],
  providers: [
    AlertifyService,
    UserService,
    TourService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
