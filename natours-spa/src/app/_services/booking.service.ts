import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CheckoutSession } from '../_models/checkoutSession';
import { Booking } from '../_models/booking';
import { APIResponse } from '../_models/apiResponse';
import { APIParams } from '../_models/apiParams';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private bookingsUrl = environment.apiUrl + 'bookings';

  constructor(private http: HttpClient) { }

  /** GET bookings from the server */
  getBookings(apiParams: APIParams<Booking>): Observable<APIResponse<Booking[]>> {
    let result: APIResponse<Booking[]> = new APIResponse<Booking[]>();

    let params = new HttpParams();

    if (apiParams.page != null && apiParams.limit != null) {
      params = params.append('page', apiParams.page.toString());
      params = params.append('limit', apiParams.limit.toString());
    }

    if (apiParams.user) {
      params = params.append('user', apiParams.user);
    }

    if (apiParams.sort) {
      params = params.append('sort', apiParams.sort);
    }

    return this.http.get<APIResponse<Booking[]>>(this.bookingsUrl, { observe: 'response', params }).pipe(
      map(response => {
        result = response.body;
        return result;
      })
    );
  }

  getCheckoutSession(bookingId: string): Observable<CheckoutSession> {
    const url = `${this.bookingsUrl}/checkout-session/${bookingId}`;

    console.log('GET ', url);
    return this.http.get<CheckoutSession>(url, { observe: 'response' }).pipe(
      map(response => {
        const result = response.body;
        console.log('result ', result);
        return result;
      })
    );
  }

  addBooking(booking: Booking) {
    return this.http.post(this.bookingsUrl + '/checkout-booking', booking);
  }

  updatePaid(bookingId: string) {
    return this.http.patch(this.bookingsUrl + `/checkout-paid/${bookingId}`, { });
  }

}
