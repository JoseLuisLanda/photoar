import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { ElementId } from 'src/app/collections/element';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  @Input() item: ElementId = {name:"example",description:"hola", normalizedName:""} as ElementId;
  @Input() newItem: ElementId = {name:"example",description:"hola", normalizedName:""} as ElementId;
  @Input() uploadImage: boolean = false;
  @Input() elements: ElementId[] =[];
  @Input() isform: boolean = true;
  @Input() type: string = "form";
  @Input() currentMarkerIndex: number = 0;
  @Input() search: boolean = false;
  @Input() detail: boolean = false;
  @Input() codes: ElementId={uid:"",areas:[{name:"general",code:"general",normalizedName:"general"}],codes:["general"]};
  @Input() caller: string = "Elemento";
  @Output() valueInputText: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() selectedValue: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  constructor() {
    //console.log("constructor ",JSON.stringify(this.codes))
    this.codes = {uid:"",areas:[{name:"general",code:"general",normalizedName:"general"}],codes:["general"]};
   }
  
   ngOnChanges(){
    //console.log("onchanges ",JSON.stringify(this.codes))
   }

  ngOnInit(): void {
    //console.log("init ",JSON.stringify(this.codes))
  }
  returnPlace(place: ElementId){
    this.selectedValue.emit(place);
  }
}
