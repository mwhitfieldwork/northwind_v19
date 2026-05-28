import { Component } from '@angular/core';
import { UsersComponent } from '../../shared/users/users.component';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
