import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { UserUpdatePassword } from 'src/app/_models/userUpdatePassword';
import { UserUpdateSettings } from 'src/app/_models/userUpdateSettings';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/_services/util.service';
import { APIResponse } from 'src/app/_models/apiResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('settingsForm', {static: true}) settingsForm: NgForm;
  @ViewChild('passwordForm', {static: true}) passwordForm: NgForm;

  userSettings: UserUpdateSettings = this.authService.currentUser;
  userPassword: UserUpdatePassword = { passwordCurrent: '', password: '', passwordConfirm: '' };

  newPhoto: File = null;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService,
              public utilService: UtilService, private router: Router) { }

  ngOnInit() {
    this.userSettings = this.authService.currentUser;
    this.initPaswordControls();
    this.authService.photoUrl.subscribe(photo => this.userSettings.photo = photo);
  }

  save() {
    this.userService.updateUser(this.userSettings, this.newPhoto).subscribe ((next: APIResponse<User[]>) => {
      this.alertify.success('Profile update successfuly');

      const value: any = next.data.data;
      this.updateCurrentUserData(value.photo);

    }, error => {
      this.alertify.error(error);
    });
  }

  savePassword() {
    this.userService.updateUserPassword(this.userPassword).subscribe (next => {
      this.alertify.success('Password update successfuly');
      this.initPaswordControls();
      this.passwordForm.reset(this.passwordForm);
    }, error => {
      this.alertify.error(error);
    }); 
  }

  initPaswordControls() {
    this.userPassword.passwordCurrent = '';
    this.userPassword.password = '';
    this.userPassword.passwordConfirm = '';
  }

  handleFileInput(files: FileList) {
    this.newPhoto = files.item(0);
  }

  updateCurrentUserData(photo: string) {
    this.userSettings.photo = photo;
    this.authService.currentUser.photo = this.userSettings.photo;
    this.authService.currentUser.name = this.userSettings.name;
    this.authService.currentUser.email = this.userSettings.email;
    this.authService.changeMemberPhoto(this.userSettings.photo);

    this.authService.setUserToLocalStorage(this.authService.currentUser);
  }
}
