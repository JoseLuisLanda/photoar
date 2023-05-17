import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private router: Router) { }

  ngOnInit(): void {
   // console.log(JSON.stringify(this.item));
  }
  receiveModel(modelName: string){
    //console.log("otro modelo received: " + modelName);
    this.itemAR.name = modelName;
  }
  goToHome(){
    this.router.navigateByUrl('/home');
    
  }
  
}
