import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { FileModel } from '../../collections/file.model';
import { ElementId, Elemento } from 'src/app/collections/element';
import * as firebase from 'firebase/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private storage = getStorage();
  private url = environment.serviceURL;
  private CARPETA_FILES = 'images';
  //private storageRef: AngularFirestoreCollection<Elemento>;
  public imagenUrl = false;
  imagenes : ElementId[] = [];
  constructor(private http: HttpClient,
              private db: AngularFirestore,
              private _router: Router) {

  }
  
  async cargarImagenesFirebase( imagenes: FileModel[], path: string): Promise<ElementId[]> {
    this.CARPETA_FILES = path;
    
    this.imagenes = [];
        for (const item of imagenes) {
    
          item.estaSubiendo = true;
          if ( item.progreso >= 100) {
            continue;
          }

          const storageRef = ref(this.storage,  path +"/"+ item.nombreArchivo);
          const uploadTask1 = uploadBytesResumable(storageRef, item.archivo);

          uploadTask1.on('state_changed',
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
  (error) => {
    // Handle unsuccessful uploads
  },
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask1.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      item.url =  downloadURL ;
                              item.estaSubiendo = false;
                           
                                this.imagenes.push({
                                  uid:"",
                                  name:item.nombreArchivo,
                                  url:item.url,
                                  duration: item.duration
                                });
                                
    });
  }
);
       
        }
        return this.imagenes;
      }
    
    /*  guaradarFile(imagenes: FileModel[], element: ElementId, single: boolean = false ){
        console.log("element on service: "+JSON.stringify(element))
      const item = imagenes[0];
      const uploadTask: firebase.default.storage.UploadTask =
                         this.storageRef.child(`${ element.url } /${ item.nombreArchivo}`)
                         .put( item.archivo);
    
                         const ret = uploadTask.on ( firebase.default.storage.TaskEvent.STATE_CHANGED,
                          ( snapshot: { bytesTransferred: number; totalBytes: number; } ) => item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
                          ( error: any ) => console.log('Error al subir', error),
                          () => {
                            console.log('Imagen cargada correctamente');
                             uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl: any) => {
                              // update firebase database
                              item.url =  downloadUrl ;
                              item.estaSubiendo = false;
                              if(single)
                              element.images = this.imagenes;
                              else
                              element.images = element.images  ? element.images:this.imagenes;
                              console.log("Is Single: "+single+" element.images: "+JSON.stringify(element.images))
                              //if(this.imagenUrl){
                                element.images.push({
                                  uid:Date.now().toString(),
                                  id: element.url,
                                  name:item.nombreArchivo,
                                  url:item.url
                                });
                              
                                //this.guardarFile (element, imagenes);
                         
                              
                              });
                              
                          });

                          return uploadTask;
                      
    }*/
    private guardarFile(element: ElementId, imagenes: FileModel[]) {
      let lastFile = true;
      for (const item of imagenes) {
        if ( item.progreso !== 100 ) {
          lastFile = false;
        }
      }
      if (lastFile) {
       // this.updateUserData({images:element.images}, element.url!) 
      }
      
    }
   /* private updateUserData(element: any, url: string) {
      //console.log("FGUARDANDO FILE: "+ JSON.stringify(element)+" TO: "+ url);
      this.imagenes = [];
      const userRef = this.db.doc(url);
      console.log("setting element:"+JSON.stringify(element)+url)
      return userRef.set(element, { merge: true });
    }*/
    
    deleteFile(element: ElementId) {
      //var name = element.item!.id +"/"+ element.item!.name.split(".")[0];
     //console.log("deleting file: "+name)
     element.images?.splice(element.images?.indexOf(element.item!),1)
      // this.updateUserData({images:element.images}, element.url!) 
      
      /* this.storageRef.child('/file/comunidad.png').delete().then(() => {
       console.log('File Successfully deleted');
       //onst index = this.currentUser.grupos!.findIndex(ev=>ev.uid === event.id);
       element.images?.splice(element.images?.indexOf(element.item!),1)
       this.updateUserData({images:element.images}, element.url!) 
        // File deleted successfully
      }).catch(function(error) {
        console.log('File UNSuccessfully deleted'+JSON.stringify(error));
        // Uh-oh, an error occurred!
      });*/
    }
}
