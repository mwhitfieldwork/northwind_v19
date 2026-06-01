import { Component } from '@angular/core';
import { UsersComponent } from '../../shared/users/users.component';
import { DUMMY_USERS } from '../../utilities/models/DUMMY_USERS';
import { TasksComponent } from "./tasks/tasks.component";
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [UsersComponent, TasksComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  users = DUMMY_USERS;
  selectedUserId?:string;

get selectedUser() {
  return this.users.find(user => user.id === this.selectedUserId);
}
  onSelectUser(id:string) {
    this.selectedUserId = id;
    console.log(this.selectedUser);
  }
}
