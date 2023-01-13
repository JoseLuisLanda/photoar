import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Elemento } from '../../collections/element';
import { collection, query, where, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  private dbPath = '/foto';

  fotosRef: AngularFirestoreCollection<Elemento>;

  constructor(private db: AngularFirestore) {
    this.fotosRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Elemento> {
    return this.fotosRef;
  }

  getPhoto(): any{
    return this.fotosRef;
  }

  create(tutorial: Element): any {
    //return this.tutorialsRef.add({ ... });
  }

  update(id: string, data: any): Promise<void> {
    return this.fotosRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.fotosRef.doc(id).delete();
  }
}