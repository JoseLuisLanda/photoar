import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() item: ElementId ={uid:"1"};
  @Output() selectedValue: EventEmitter<ElementId> = new EventEmitter<ElementId>();


  constructor() { }

  ngOnInit(): void {
  }
  returnPlace(place: ElementId){
    this.selectedValue.emit(place);
  }
 
}
