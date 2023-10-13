import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { Router } from '@angular/router';
@Component({
  selector: 'app-arelement',
  templateUrl: './arelement.component.html',
  styleUrls: ['./arelement.component.css']
})
export class ARElementComponent implements OnInit {

  @Input() modelos: ElementId [] = [{name:"Publicar3D",url:"https://firebasestorage.googleapis.com/v0/b/uptamira.appspot.com/o/3Dmodels%2Fpublicar3d%2Fpublicar3d.glb?alt=media&token=0e9b981e-3234-4511-84c2-bec20864590e"},
  {name:"Venom",url:"https://firebasestorage.googleapis.com/v0/b/uptamira.appspot.com/o/3Dmodels%2Fvenom2018.glb?alt=media&token=c242b813-cb22-48fa-a8a7-ecf727ea6a49"}];

  @Input() itemAR:ElementId={};
  @Output() returnBtn: EventEmitter<boolean> = new EventEmitter<boolean>();
  urlItem: string="";
  constructor(private router: Router) { }


  ngOnInit(): void {
   // console.log(JSON.stringify(this.item));
   this.urlItem = this.itemAR.url?this.itemAR.url:this.modelos[0].url!;

  }
  receiveModel(modelName: string){
    //console.log("otro modelo received: " + modelName);
    this.urlItem = modelName;
  }
  goToHome(){
    this.router.navigateByUrl('/home');
  
   // this.returnBtn.emit(false);
  }
  
}
