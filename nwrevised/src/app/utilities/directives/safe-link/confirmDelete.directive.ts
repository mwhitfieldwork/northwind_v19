import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[confirmDelete]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)'
  }
})
export class ConfirmDeleteDirective {
  @Output() safelinkConfirmed = new EventEmitter<void>();


  onClick($event:MouseEvent):void {
    const isReadytoContinue= window.confirm('Are you sure?');

    if(isReadytoContinue) {
      this.safelinkConfirmed.emit();
    }else{
      $event.preventDefault();
    }

  }

}
