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
  tagNumberinit = 5;
  tagNumberend = 10;
  tagNumberlength = 5;
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("AFELEMENT receiving"+JSON.stringify(this.item));
    this.urlPhoto = this.item.images![0].url!;
    
    this.tagNumberlength = this.item.images!.length;
      
    
    
  }
  homeAction(){
    //console.log("home action pressed");
    this.router.navigate(['/home'])
  .then(() => {
    window.location.reload();
  });
  }
}
