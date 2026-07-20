import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Visitor} from '../../utilities/models/visitor.model';
import { Authentication } from '../../utilities/models/authentication';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
@Input() user: Visitor | undefined;
@Input() signInUser?: Authentication | null;;
@Output() select = new EventEmitter<string>();

get imagePath() {
  return `assets/users/${this.user?.avatar}`;
}

onSelectUser(selectedUser:string) {
  this.select.emit(this.user?.id);
}

}
