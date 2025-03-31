import { Component, inject } from '@angular/core';
import { AuthLoginComponent } from "./auth-form/auth-form.component";
import { Authentication } from '../../utilities/models/authentication';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../utilities/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthLoginComponent, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private _loginService = inject(LoginService)
private router = inject(Router)
signInErrorMessage = '';
  
  createUser($event:Authentication){
    this._loginService.createUser($event).subscribe((response) => {
      console.log(response);
      /*if(response?.value?.message === "Authentication successful.") {
        this.router.navigate(['/dashboard']);
      } else{
        this.signInErrorMessage = response.value
      }*/
    });
  }

  verifyUser($event:Authentication){
    this._loginService.AuthenticateUser($event).subscribe((response) => {
      if(response?.value?.message === "Authentication successful.") {
        this.router.navigate(['/dashboard']);
      } else{
        this.signInErrorMessage = response.value
      }
    });
  }

}
