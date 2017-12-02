import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { LoginModel } from "../../models/loginModel";

import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../services/alert-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, AlertService]
})
export class LoginComponent {

  loginModel: LoginModel;

  constructor(
    private _auth: AuthService,
    private alert: AlertService,
    private router: Router
  ) {
    this.loginModel = new LoginModel();
  }

  submitForm(): void {
    this.login(this.loginModel);
  }

  //------------------------------------------------
  // Login
  login(credentials) {
    this._auth.login(credentials)
      .then(response => {
        if (this._auth.isAuthenticated()) {
          this._resetLoginForm();
          this.alert.success("Success", "Welcome Back ;)");
          
          setTimeout(() => {
            this.router.navigate(['home']);
            location.reload();
          }, 1500);

        }
      })
      .catch((response) => {
        if (response.status === 400) {
          this.alert.error("Error", "Username doesn't exist or the password is wrong");
        }
      });
  }

  //------------------------------------------------
  _resetLoginForm(): void {
    this.loginModel.username = "";
    this.loginModel.password = "";
  }
}
