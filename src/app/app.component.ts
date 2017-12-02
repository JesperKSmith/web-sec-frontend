import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/home']);
    }
  }
}
