import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login (this.user).subscribe(next => {
      this.alertify.success('logged in successfuly');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/tours']);
    });
  }

}
