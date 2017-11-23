import { Component } from '@angular/core';

import { AuthService } from "../../services/auth.service";

import { LoginModel } from "../../models/loginModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {

  loginModel : LoginModel;

  constructor(private _auth: AuthService) {
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
        console.log('Server Login Response');
        console.log(response);
      })
  }
}
