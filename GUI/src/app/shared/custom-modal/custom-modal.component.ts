import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
})
export class CustomModalComponent {
  @Input() title: string = 'Default Title';
  @Input() content: string = '';
  @Input() contentTemplate?: TemplateRef<any>;
  @Output() modalEvent:EventEmitter<any> = new EventEmitter()

  onClose() {
    this.modalEvent.emit('closed')
  }
}