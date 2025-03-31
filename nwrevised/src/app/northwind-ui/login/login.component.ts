import { Component } from '@angular/core';
import { AuthLoginComponent } from "./auth-form/auth-form.component";
import { Authentication } from '../../utilities/models/authentication';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthLoginComponent, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  createUser($event:Authentication){
    console.log($event, "Create User");
  }

  loginUser($event:Authentication){
    console.log($event, "Login User");
  }

}
