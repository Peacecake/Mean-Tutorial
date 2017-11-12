import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';

import { ValidateService } from '../../services/validate.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  name : String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService : ValidateService, private flashMessages : FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessages.show("Please fill in all fields", {cssClass: "alert-danger", timeout: 3000});
      return false;
    }


    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show("Please use a valid email", {cssClass: "alert-danger", timeout: 3000});
      return false;
    }
  }

}
