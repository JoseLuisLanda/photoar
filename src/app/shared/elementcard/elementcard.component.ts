import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ElementId } from 'src/app/collections/element';

@Component({
  selector: 'app-elementcard',
  templateUrl: './elementcard.component.html',
  styleUrls: ['./elementcard.component.css']
})
export class ElementcardComponent implements OnInit {
  @Input() item: ElementId ={uid:"1"};
  @Input() selected: boolean = false;
  @Input() detail: boolean = false;
  @Input() showImg: boolean = false;
  @Input() imgURL: string = "";
  @Output() elementSelected: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  imgs:ElementId[] = [];
  constructor() { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.imgs = this.item!.images !==undefined ?this.item!.images:this.imgs;
  }
  selectedElement(){
    this.elementSelected.emit(this.item);
 }
 selectedImage(id: number){
   this.imgURL = this.imgs[id].url!;
   this.showImg = true;
   console.log("SELECTING: "+this.imgs[id].url);
 }
 closeImg(){
   this.showImg = false;
 }
}
