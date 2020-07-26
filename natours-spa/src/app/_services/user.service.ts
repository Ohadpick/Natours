import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserUpdateSettings } from '../_models/userUpdateSettings';
import { AuthService } from './auth.service';
import { UserUpdatePassword } from '../_models/userUpdatePassword';
import { APIResponse } from '../_models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private usersUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient, private authSrvice: AuthService) { }

  /** PATCH: update the tour on the server */
  updateUser(user: UserUpdateSettings, photo: File) {
    const formData: FormData = new FormData();
    if (photo) {
      formData.append('photo', photo, photo.name);
    }
    formData.append('name', user.name);
    formData.append('email', user.email);

    const url = `${this.usersUrl}/updateMe`;

    return this.http.patch (url, formData);
  }

  /** PATCH: update the tour on the server */
  updateUserPassword(user: UserUpdatePassword): Observable<any> {
    const url = `${this.usersUrl}/updateMyPassword`;

    return this.http.patch (url, user);
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
