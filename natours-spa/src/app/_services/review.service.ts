import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Review } from '../_models/review';
import { APIResponse } from '../_models/apiResponse';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { APIParams } from '../_models/apiParams';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private reviewsUrl = environment.apiUrl + 'reviews';

  constructor(private http: HttpClient) { }

  /** GET reviews from the server */
  getReviews(apiParams: APIParams<Review>): Observable<APIResponse<Review[]>> {
    let result: APIResponse<Review[]> = new APIResponse<Review[]>();

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

    return this.http.get<APIResponse<Review[]>>(this.reviewsUrl, { observe: 'response', params }).pipe(
      map(response => {
        result = response.body;
        return result;
      })
    );
  }

  /** PUT: update the review on the server */
  updateReview(review: Review): Observable<any> {
    const url = `${this.reviewsUrl}/${review._id}`;

    return this.http.patch(url, review, this.httpOptions).pipe(
      tap(_ => console.log(`updated tour id=${review._id}`)),
      catchError(this.handleError<any>('updateReview'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
