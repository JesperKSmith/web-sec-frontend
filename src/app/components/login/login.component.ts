import { Component } from '@angular/core';

import { AuthService } from "../../services/auth.service";

import { LoginModel } from "../../models/loginModel";

import { Router } from "@angular/router";

import { AlertService } from "../../services/alert-service.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, AlertService ]
})
export class LoginComponent {

  loginModel : LoginModel;

  constructor(private _auth: AuthService, private alert: AlertService, private router: Router) {
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
        if(this._auth.isAuthenticated()) {
          this.router.navigate(['home']);
          this.alert.success("Access granted", "welcome");
        }
      })
      .catch((response) => {      
        if(response.status === 400) {
          this.alert.error("Error", "Username doesn't exist, or the password is wrong");
        }
      });
  }
}
