import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice';
import { Router } from '@angular/router';
import { ElementId } from '../collections/element';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  placesPublicar: ElementId[]=[{normalizedName:"turismo",code:"huapalcalco",name:"Huapalcalco",latitude:"20.065288",longitude:"-98.423772",position:"", description:"Centro arqueológico",location:"general"},
  {normalizedName:"negocio",code:"artesaniasgdl",name:"Creativa GDL",latitude:"20.677960",longitude:"-103.342280",position:"", description:"Tulancingo de bravo Hgo",location:"creativagdl"},
  {normalizedName:"museos",code:"citnova",name:"CITNOVA",latitude:"20.134168",longitude:"-98.802341",position:"", description:"Centro de investigación y tecnología",location:"general"}]
  
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }
  goTo(index: number){
    this.dataService.setItem(this.placesPublicar[0]);
    this.router.navigateByUrl('/home');
    

  }
}
