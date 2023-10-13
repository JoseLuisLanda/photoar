import { Component, OnInit } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { DataService } from 'src/app/services/dataservice';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
itemSearch:ElementId;
  constructor(private dataService: DataService,) { }

  ngOnInit() {
  }
  itemSelected(element: ElementId){
    
   // this.dataService.setItem(element);
  }
}
