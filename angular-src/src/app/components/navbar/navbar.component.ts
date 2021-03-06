import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router,
    private flashMessage : FlashMessagesService) { }

  ngOnInit() {
  }

  onLogoutClick() : boolean{
    this.authService.logout();
    this.flashMessage.show('You are logged out', {cssClass: "alert-success", timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

}
