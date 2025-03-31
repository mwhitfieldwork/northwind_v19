import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Authentication } from '../../../utilities/models/authentication';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthLoginComponent {
  @Input() signInErrorMessage!: string;

  @Output() submitted = new EventEmitter<Authentication>()


onSubmit(form:Authentication){
  this.submitted.emit(form);
}

}
