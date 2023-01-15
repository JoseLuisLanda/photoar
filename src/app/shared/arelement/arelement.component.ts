import { Component, Input, OnInit } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { Router } from '@angular/router';
@Component({
  selector: 'app-arelement',
  templateUrl: './arelement.component.html',
  styleUrls: ['./arelement.component.css']
})
export class ARElementComponent implements OnInit {
  @Input() item: ElementId = 
  {name:"../../assets/models/alien.glb"} as ElementId;
  itemAR:ElementId={uid:"sky",name:"../../assets/models/Astronaut.glb"};
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.item));
  }
  receiveModel(modelName: string){
    console.log("otro modelo received: " + modelName);
    this.itemAR.name = modelName;
  }
  goToHome(){
    this.router.navigateByUrl('/home');
    
  }
}
