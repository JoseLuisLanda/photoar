import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Elemento } from '../../collections/element';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  private dbPath = '/museos';
  private itemsCollection!: AngularFirestoreCollection<any>;
  items!: Observable<any[]>;
  elementRef: AngularFirestoreCollection<Elemento>;

  constructor(private db: AngularFirestore) {
    this.elementRef = db.collection(this.dbPath);
  }

  getAllItems(type: string): AngularFirestoreCollection<Elemento> {
    this.dbPath = "/"+type;
    this.elementRef = this.db.collection(this.dbPath)
    return this.elementRef;
  }

public getCollection(nameCollection: string, count: number = 10, keySearch:string = "", keyValue:string = "", collection:string = "",value:string = "") {   
this.itemsCollection = this.db.collection<any>("museos", (ref) =>
//ref.where("name", 'array-contains',"value"));//.orderBy("dateCreated"));
ref.where("name", '==',"Museo de los duendes"));
 if(collection !== "" && value !== "")
  {
    this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
    ref.where(collection, 'array-contains',value));//.orderBy("dateCreated"));
   
  }else if(keySearch !=="" && keyValue !== ""){
    //console.log("CALLING WHERE: "+collection + value)
    this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
    ref.where(keySearch, '==',keyValue));//.orderBy("dateCreated"));
  }else{
    this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
    ref.limit(count).orderBy("dateCreated"));
  }
this.items = this.itemsCollection.snapshotChanges().pipe(
  map((actions) =>
    actions.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    })
  )
);
//console.log('getting collection: ', nameCollection);
return this.items;
  }

  getPhoto(): any{
    return this.elementRef;
  }

  create(tutorial: Element): any {
    //return this.tutorialsRef.add({ ... });
  }

  update(id: string, data: any): Promise<void> {
    return this.elementRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.elementRef.doc(id).delete();
  }
}