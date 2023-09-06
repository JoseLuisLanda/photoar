import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
declare function playVideo(url:string) : any;
declare function stopVideo(url:string) : any;
@Component({
  selector: 'app-elementcard',
  templateUrl: './elementcard.component.html',
  styleUrls: ['./elementcard.component.css']
})
export class ElementcardComponent implements OnInit {
  @Input() item: ElementId ={uid:"1"};
  @Input() elements: ElementId[];
  @Input() currentMarkerIndex: number = 0;
  @Input() selected: boolean = false;
  @Input() detail: boolean = false;
  @Input() showImg: boolean = false;
  @Input() imgURL: string = "";
  @Output() elementSelected: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  imgs:ElementId[] = [];
  tempImg: string = "";

  @ViewChild('videplayer', { static: true }) myVideo: ElementRef;

  constructor() {
   
   }
 
  
  ngOnInit(): void {
    if(this.elements){
      this.imgs = this.elements;
       //console.log("nginit ",JSON.stringify(this.elements))
    }
    else if(this.item.type === "photo" &&  this.item!.images!.length > 0)
    this.imgs = this.item!.images!
    else if(this.item.images![this.currentMarkerIndex] || this.item.type == "poster")
    {
      this.imgs = this.item.images![this.currentMarkerIndex].elements!;
    }else
    this.imgs =[{uid:"",name:"no hay contenido extra",url:"../../../assets/img/noimage.png"}] ;
    }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("index", this.currentMarkerIndex + " and item",JSON.stringify(this.item));
    if(this.elements){
      this.imgs = this.elements;
      //console.log("ngchanges ",JSON.stringify(this.elements))
    }
    else if(this.item.type === "photo" &&  this.item!.images!.length > 0)
    this.imgs = this.item!.images!
    else if(
      this.item!.images![this.currentMarkerIndex] || this.item.type == "poster")
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
 stopVideo(videoUrl:string) {
  console.log("stop video");
  stopVideo(videoUrl);
 // this.myVideo.nativeElement.play();
  //(<HTMLVideoElement> document.getElementById("videplayer")).play();
}
startVideo(videoUrl:string) {
  console.log("stop video");
  playVideo(videoUrl);
 // this.myVideo.nativeElement.play();
  //(<HTMLVideoElement> document.getElementById("videplayer")).play();
}
}
