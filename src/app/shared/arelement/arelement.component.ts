import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { Router } from '@angular/router';
@Component({
  selector: 'app-arelement',
  templateUrl: './arelement.component.html',
  styleUrls: ['./arelement.component.css']
})
export class ARElementComponent implements OnInit {
  @Input() modelos: ElementId [] = [{name:"chase"},{name:"rubble"}];
  @Input() itemAR:ElementId={uid:"sky",url:"../../assets/models/Astronaut.glb"};
  @Output() returnBtn: EventEmitter<boolean> = new EventEmitter<boolean>();
  urlItem: string="";
  constructor(private router: Router) { }

  ngOnInit(): void {
   // console.log(JSON.stringify(this.item));
   this.urlItem = this.itemAR.url?this.itemAR.url:"";
  }
  receiveModel(modelName: string){
    //console.log("otro modelo received: " + modelName);
    this.urlItem = modelName;
  }
  goToHome(){
    //this.router.navigateByUrl('/home');
  
    this.returnBtn.emit(false);
  }
  
}
