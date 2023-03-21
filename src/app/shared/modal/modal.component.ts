import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementId } from 'src/app/collections/element';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() item: ElementId = {} as ElementId;
  @Input() uploadImage: boolean = false;
  @Input() currentMarkerIndex: number = 0;
  @Input() search: boolean = false;
  @Input() detail: boolean = false;
  @Input() codes: ElementId = {uid:""};
  @Input() caller: string = "Elemento";
  @Output() valueInputText: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() selectedValue: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  returnPlace(place: string){
    this.selectedValue.emit(place);
  }
}
