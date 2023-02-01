import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { Router } from '@angular/router';
@Component({
  selector: 'app-afelement',
  templateUrl: './afelement.component.html',
  styleUrls: ['./afelement.component.css']
})
export class AfelementComponent implements OnInit {
  @Input() item: ElementId = 
  {name:"undefined",images:{}} as ElementId;
  urlPhoto: string = '../../../assets/presets/pat0.patt';
  urls:string[] = [];
  tagNumberinit = 0;
  tagNumberend = 1;
  tagNumberlength = 1;
  currentMarkerIndex = 0;
  videoUrl: string= "https://firebasestorage.googleapis.com/v0/b/uptamira.appspot.com/o/undefined%20%2Ffotos.MP4?alt=media&token=7a6a4f38-47d0-4340-b436-a17d6147182a";
  @ViewChild('markr', { static: false }) mrkDiv: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(private elementRef:ElementRef,
    private router: Router
  ) {}
  ngAfterViewInit() {
    
    var scene = this.elementRef.nativeElement.querySelector('.scene');
    
    for(var i=0; i<= this.tagNumberlength; i++)
		{
      var indexPath = +this.tagNumberinit+i;
			var url="../../../assets/presets/pat"+indexPath+".patt";
      var markerIndex = "marker_"+i;

			scene.insertAdjacentHTML('beforeend', 
      '<a-marker id="'+markerIndex+'" type="pattern" registerevents url="'+url+'"></a-marker>');
      var marker = this.elementRef.nativeElement.querySelector('#'+markerIndex+'');

      if(this.item.images![i].type == "video")
      {
        marker.id = "markervid_"+i;
        marker.title = "video"+indexPath;
        marker.insertAdjacentHTML('beforeEnd', 
        '<a-video id="videop'+indexPath+'" src="#video'+indexPath+'" width="3" height="2" position="0 0 0" rotation="270 0 0"></a-video>');
        console.log("asignando a marker: "+marker.id);
      
      }else if(this.item.images![i].type == "image"){
        marker.insertAdjacentHTML('beforeEnd', 
        '<a-image position="0 .1 0" rotation="-90, 0, 0" src="#img'+indexPath+'" width="3" height="3"></a-image>');
      }
      
      
      
      //'<a-image position="0 .1 0" rotation="-90, 0, 0" src="#img'+indexPath+'" width="3" height="3"></a-image>');
     //'<a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>');
    }
  }
  ngOnInit(): void {
   // console.log("AFELEMENT receiving"+JSON.stringify(this.item));
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
