import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alerfity: AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {mismatch: true};
  }

  signup() {
    if (this.signupForm.valid) {
      this.user = Object.assign({}, this.signupForm.value);
      this.authService.signup(this.user).subscribe(() => {
        this.alerfity.success('registration successful');
      }, error => {
          this.alerfity.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/']);
        })
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
