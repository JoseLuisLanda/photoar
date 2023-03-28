import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, QueryFn } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { serverTimestamp } from 'firebase/firestore';




type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T>        = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class AfsService {
  private url:string = environment.serviceURL;
  constructor(private angularfs: AngularFirestore, private http: HttpClient) { 
    
  }

  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn<DocumentData> | undefined): AngularFirestoreCollection<T>{
    return typeof ref ==='string' ? this.angularfs.collection<T>(ref,queryFn) : ref
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T>{
    return typeof ref === 'string' ? this.angularfs.doc<T>(ref): ref
  }
createId(){
  return this.angularfs.createId();
}
serverDate(){
  return "";
}
/// Get Data

doc$<T>(ref: DocPredicate<T>): Observable<T>{
  return this.doc(ref).snapshotChanges().pipe(map(doc => {

    return doc.payload.data() as T
  }))
}

col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn<DocumentData> | undefined): Observable<T[]>{
  //queryFn.prototype.
  return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
return docs.map(a => a.payload.doc.data()) as T[]
  
}));
}

colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?:QueryFn<DocumentData> | undefined): Observable<any[]> {
  return this.col(ref, queryFn).snapshotChanges().pipe(map(actions =>{
    return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data as {}};

    });
  }));
}
getTimeStamp(){
 return serverTimestamp()
}
set<T>(ref: DocPredicate<T>, data: any){
  //console.log('Setting dates: ' +this.getTimeStamp);
  const timestamp = this.getTimeStamp
  return this.doc(ref).set({
    ...data,
  })
}

getSubcollection(url: string) {
    
  var authData = {
    url: url
  };
  //console.log('getting subcollection '+authData.url);
  return this.http.post<[string]>(
   // `${ this.url }/signupNewUser?key=${ this.key }`,
   this.url + '/getSubcollections',
    authData
  ).pipe(
    map( resp => {
      return resp;
    })
  );
}
}
