import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementId } from 'src/app/collections/element';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() item: ElementId = {} as ElementId;
  @Input() currentMarkerIndex: number = 0;
  @Input() search: boolean = false;
  @Input() detail: boolean = false;
  @Output() valueInputText: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  constructor() { }

  ngOnInit(): void {
  }

}
