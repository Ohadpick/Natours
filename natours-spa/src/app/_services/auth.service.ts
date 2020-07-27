import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../assets/img/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private authUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  /** POST: login to server */
  login(user: User) {
    return this.http.post(this.authUrl + '/login', user).pipe(
      map((response: any) => {
        if (response) {
          this.setUserToLocalStorage(response.data.user, response.token)
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
          this.currentUser = response.data.user;
          this.changeMemberPhoto(this.currentUser.photo);
        }
      })
    );
  }

  /** GET: logout from server */
  logout(): Observable<string> {
    return this.http.get<string>(this.authUrl + '/logout', { observe: 'response' }).pipe(
      map(response => {
        const result = response.body;
        return result;
      })
    );
  }

  signup(user: User) {
    return this.http.post(this.authUrl + '/signup', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  setUserToLocalStorage(user: User, token?: any) {
    if (token) {
      localStorage.setItem('token', token);
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.currentUser = user;
      this.changeMemberPhoto(user.photo);
    }
  }

}
