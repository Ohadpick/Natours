import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Tour } from '../_models/tour';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../_models/apiResponse';
import { APIParams } from '../_models/apiParams';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private toursUrl = environment.apiUrl + 'tours';

  constructor(private http: HttpClient) { }

  /** GET tours from the server */
  getTours(apiParams: APIParams<Tour>): Observable<APIResponse<Tour[]>> {
    let result: APIResponse<Tour[]> = new APIResponse<Tour[]>();

    let params = new HttpParams();

    if (apiParams.page != null && apiParams.limit != null) {
      params = params.append('page', apiParams.page.toString());
      params = params.append('limit', apiParams.limit.toString());
    }

    // if (apiParams.model.slug) {
    //   params = params.append('slug', apiParams.model.slug);
    // }

    if (apiParams.sort) {
      params = params.append('sort', apiParams.sort);
    }

    return this.http.get<APIResponse<Tour[]>>(this.toursUrl, { observe: 'response', params }).pipe(
      map(response => {
        result = response.body;
        return result;
      })
    );
  }

  /** GET tour by id. Will return 404 if id not found */
  getTour(id: number): Observable<Tour> {
    const url = `${this.toursUrl}/${id}`;
    return this.http.get<Tour>(url).pipe(
      tap(_ => console.log(`fetched tour id=${id}`)),
      catchError(this.handleError<Tour>(`getTour id=${id}`))
    );
  }

  /** GET tour by slug. Will return 404 if id not found */
  getTourBySlug(id: string): Observable<APIResponse<Tour[]>> {
    let result: APIResponse<Tour[]> = new APIResponse<Tour[]>();

    const url = `${this.toursUrl}/slug/${id}`;

    return this.http.get<APIResponse<Tour[]>>(url, { observe: 'response' }).pipe(
      map(response => {
        result = response.body;
        return result;
      })
    );
  }

  /** PUT: update the tour on the server */
  updateTour(tour: Tour): Observable<any> {
    return this.http.put(this.toursUrl, tour, this.httpOptions).pipe(
      tap(_ => console.log(`updated tour id=${tour._id}`)),
      catchError(this.handleError<any>('updateTour'))
    );
  }

  /** POST: add a new tour to the server */
  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.toursUrl, tour, this.httpOptions).pipe(
      tap((newTour: Tour) => console.log(`added tour w/ id=${newTour._id}`)),
      catchError(this.handleError<Tour>('addTour'))
    );
  }

  /** DELETE: delete the tour from the server */
  deleteTour(tour: Tour | number): Observable<Tour> {
    const id = typeof tour === 'number' ? tour : tour._id;
    const url = `${this.toursUrl}/${id}`;

    return this.http.delete<Tour>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted tour id=${id}`)),
      catchError(this.handleError<Tour>('deleteTour'))
    );
  }

  /* GET tours whose name contains search term */
  searchTours(term: string): Observable<Tour[]> {
    if (!term.trim()) {
      // if not search term, return empty tour array.
      return of([]);
    }
    return this.http.get<Tour[]>(`${this.toursUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found tours matching "${term}"`) :
        console.log(`no tours matching "${term}"`)),
      catchError(this.handleError<Tour[]>('searchTours', []))
    );
  }

  /** Log a TourService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`TourService: ${message}`);
  // }

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
