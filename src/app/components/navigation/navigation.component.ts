import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../services/alert-service.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AuthService, AlertService]
})
export class NavigationComponent{
  
  loggedInUser: boolean;
  menuIsVisible: boolean;

  constructor(private _authService:AuthService){
     this.loggedInUser = this._authService.isAuthenticated();
  }

  logout(): void{
    this._authService.logout();
    this.collapseMenu();
    location.reload();
  }

  collapseMenu():void{
    this.menuIsVisible = false;
  }

  showMenu():void{
    this.menuIsVisible = !this.menuIsVisible;
  }
}