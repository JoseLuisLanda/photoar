import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElementId } from '../collections/element';

@Injectable()
export class DataService {
  private item$ = new BehaviorSubject<any>({});
  private itemService$ = new BehaviorSubject<any>({});
  private itemList$ = new BehaviorSubject<any>({});
  private itemAR$ = new BehaviorSubject<any>({});

  selectedItemAR$ = this.itemAR$.asObservable();
  serviceItem$ = this.itemService$.asObservable();
  selectedItem$ = this.item$.asObservable();
  selectedItemList$ = this.itemList$.asObservable();

  constructor() {
    this.setItem({normalizedName:"negocio",code:"general",name:"San Jose",latitude:"20.065288",longitude:"-98.423772",position:"", description:"San jose tulancingo",location:"tulancingo"});
  }

  setItem(item: ElementId) {
   //console.log("SETTING ITEM"+JSON.stringify(item));
    this.item$.next(item);
  }
  setItemAR(item: ElementId) {
    console.log("SETTING ITEMAR"+JSON.stringify(item));
     this.itemAR$.next(item);
   }
  setItems(itemList: ElementId) {
    this.itemList$.next(itemList);
  }
  setItemService(itemService: ElementId) {
    this.itemService$.next(itemService);
  }
 
}