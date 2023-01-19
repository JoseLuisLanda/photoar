import { Component, Input, OnInit } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { Router } from '@angular/router';
@Component({
  selector: 'app-afelement',
  templateUrl: './afelement.component.html',
  styleUrls: ['./afelement.component.css']
})
export class AfelementComponent implements OnInit {
  @Input() item: ElementId = 
  {name:"undefined"} as ElementId;
  urlPhoto: string = "";
  urls:string[] = [];
  tagNumberinit = 0;
  tagNumberend = 1;
  tagNumberlength = 1;
  currentMarkerIndex = 0;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("AFELEMENT receiving"+JSON.stringify(this.item));
    this.urlPhoto = this.item.images![0].url!;
    
    this.tagNumberlength = this.item.images!.length !== undefined 
    && this.item.images!.length >0 ? this.item.images!.length-1:this.tagNumberlength;
    this.tagNumberinit = this.item.indexInit !== undefined 
    && this.item.images!.length >0 ? this.item.indexInit:this.tagNumberinit;
    this.tagNumberend = this.item.indexEnd !== undefined 
    && this.item.images!.length >0 ?this.item.indexEnd:this.tagNumberend;
      
    
    
  }
  homeAction(){
    //console.log("home action pressed");
    this.router.navigate(['/home'])
  .then(() => {
    window.location.reload();
  });
  }
  setMarkerIndex(){
    this.currentMarkerIndex = +(<HTMLInputElement> document.getElementById("imgIndex")).value;
    
    //console.log("marker value is: "+markerIndex+"currentmarkerindex: "+this.currentMarkerIndex);
  }
}
