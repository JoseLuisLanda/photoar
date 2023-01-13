import { Component, Input, OnInit } from '@angular/core';
import { ElementId } from 'src/app/collections/element';

@Component({
  selector: 'app-afelement',
  templateUrl: './afelement.component.html',
  styleUrls: ['./afelement.component.css']
})
export class AfelementComponent implements OnInit {
  @Input() item: ElementId = 
  {name:"undefined"} as ElementId;
  urlPhoto: string = "";
  constructor() { }

  ngOnInit(): void {
    console.log("AFELEMENT receiving"+JSON.stringify(this.item));
    this.urlPhoto = this.item.images![0].url!;
  }

}
