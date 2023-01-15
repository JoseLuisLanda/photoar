import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Elemento } from '../../collections/element';
import { collection, query, where, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  private dbPath = '/lugares';

  elementRef: AngularFirestoreCollection<Elemento>;

  constructor(private db: AngularFirestore) {
    this.elementRef = db.collection(this.dbPath);
  }

  getAllItems(type: string): AngularFirestoreCollection<Elemento> {
    this.dbPath = "/"+type;
    this.elementRef = this.db.collection(this.dbPath)
    return this.elementRef;
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