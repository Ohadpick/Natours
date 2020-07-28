import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourListComponent } from './tours/tour-list/tour-list.component';
import { TourDetailComponent } from './tours/tour-detail/tour-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SidebarComponent } from './utils/sidebar/sidebar.component';
import { AfterBookingComponent } from './bookings/after-booking/after-booking.component';

const routes: Routes = [
  { path: '', redirectTo: '/tours', pathMatch: 'full' },
  { path: 'tours', component: TourListComponent },
  { path: 'tour/:id', component: TourDetailComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/logout', component: LogoutComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'users/settings', component: SidebarComponent },
  { path: 'users/bookings', component: SidebarComponent },
  { path: 'users/reviews', component: SidebarComponent },
  { path: 'users/billings', component: SidebarComponent },
  { path: 'bookings/:bookingId', component: AfterBookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
