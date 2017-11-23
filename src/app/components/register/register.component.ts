import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../services/alert-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService, AlertService]
})

export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private _auth: AuthService,
    private _alert: AlertService,
    private _formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  submitForm(): void {

    let testUser = this._makeUser();

    this._auth.register(testUser).then(response => {
      console.log("YOU MADE IT!.. MAYBE");
    });

    this.registerForm.reset();
    window.location.reload(true);
  }


  // ===========================================================================
  // FUNCTIONS  

  createForm() {
    this.registerForm = this._formBuilder.group({
      username: [
        '', Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      password1: [
        '', Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      password2: [
        '', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  // ---------------------------------------------------------------------------
  // FROM GETTERS
  get username() { return this.registerForm.get('username'); }
  get password1() { return this.registerForm.get('password1'); }
  get password2() { return this.registerForm.get('password2'); }

  // ---------------------------------------------------------------------------
  isValidField(fieldName: string) {
    return this.registerForm.get(fieldName).status == 'VALID';
  }
  // ---------------------------------------------------------------------------

  isValidForm() {

    let isValidForm = this.registerForm.status == 'VALID';
    let passwordsMatch = this.areMatchingPasswords();

    return isValidForm && passwordsMatch;
  }

  // ---------------------------------------------------------------------------
  areMatchingPasswords(): boolean {
    return this.registerForm.get('password1').value === this.registerForm.get('password2').value;
  }

  // ---------------------------------------------------------------------------

  _makeUser(): any {
    return {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password1
    }
  }
  // ---------------------------------------------------------------------------
}