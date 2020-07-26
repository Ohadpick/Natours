import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  photo: string;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router,
              public utilService: UtilService) { }

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(photo => this.photo = photo);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  getUserName() {
    return this.authService.currentUser.name;
  }
}
