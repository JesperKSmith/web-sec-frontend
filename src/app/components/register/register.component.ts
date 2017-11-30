import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../services/alert-service.service";
import { ValidationService } from "../../services/validation.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    AuthService,
    AlertService,
    ValidationService
  ]
})

export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private _auth: AuthService,
    private _alert: AlertService,
    private _validator: ValidationService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.createForm();
  }

  submitForm(): void {

    let testUser = this._makeUser();

    this._auth.register(testUser)
      .then(response => {
        this.registerForm.reset();
        this._alert.success("Hallo 😘", "Successful registration.");

        setTimeout(() => {
          this._router.navigate(['/home']);
          location.reload();
        }, 1500);
      })
      .catch(err => {
        this._alert.error("Register Error", err.message);
      });

  }


  // ===========================================================================
  // FUNCTIONS  

  createForm() {
    this.registerForm = this._formBuilder.group({
      username: [
        '', Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      password1: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          this._validator.inputHasNumber,
          this._validator.inputHasUpperCase
        ])
      ],
      password2: [
        '', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          this._validator.inputHasNumber,
          this._validator.inputHasUpperCase
        ])
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
}