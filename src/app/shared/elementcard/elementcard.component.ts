import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ElementId } from 'src/app/collections/element';

@Component({
  selector: 'app-elementcard',
  templateUrl: './elementcard.component.html',
  styleUrls: ['./elementcard.component.css']
})
export class ElementcardComponent implements OnInit {
  @Input() item: ElementId ={uid:"1"};
  @Input() currentMarkerIndex: number = 0;
  @Input() selected: boolean = false;
  @Input() detail: boolean = false;
  @Input() showImg: boolean = false;
  @Input() imgURL: string = "";
  @Output() elementSelected: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  imgs:ElementId[] = [];
  tempImg: string = "";

  constructor() { }

  ngOnInit(): void {
    if(this.item.type === "photo" &&  this.item!.images!.length > 0)
    this.imgs = this.item!.images!
    else if(this.item.images![this.currentMarkerIndex] || this.item.type == "poster")
    {
      this.imgs = this.item.images![this.currentMarkerIndex].elements!;
    }else
    this.imgs =[{uid:"",name:"no hay contenido extra",url:"../../../assets/img/noimage.png"}] ;
    }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("index", this.currentMarkerIndex + " and item",JSON.stringify(this.item));
    if(this.item.type === "photo" &&  this.item!.images!.length > 0)
    this.imgs = this.item!.images!
    else if(this.item!.images![this.currentMarkerIndex] || this.item.type == "poster")
    {
      this.imgs = this.item.images![this.currentMarkerIndex].elements!;
    }else
    this.imgs =[{uid:"",name:"no hay contenido extra",url:"../../../assets/img/noimage.png"}] ;
  }
  selectedElement(){
    this.elementSelected.emit(this.item);
 }
 selectedImage(id: number){
   this.imgURL = this.imgs[id].url!;
   this.showImg = true;
   //console.log("SELECTING: "+this.imgs[id].url);
 }
 selectedTempImage(id: string){
  this.tempImg = this.imgURL;
  this.imgURL = id;
  this.showImg = true;
  //console.log("SELECTING: "+this.imgs[id].url);
}
selectedTempMarker(id: number){
  this.tempImg = this.imgURL;
  this.imgURL = "../assets/img-presets/"+id+".png";
  this.showImg = true;
}
 closeImg(){
  this.imgURL = this.tempImg;
   this.showImg = false;
 }
}
