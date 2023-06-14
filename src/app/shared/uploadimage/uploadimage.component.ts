import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { FileModel } from 'src/app/collections/file.model';
import { FileService } from '../services/file.service';
import html2canvas from "html2canvas"; 
import { image } from 'html2canvas/dist/types/css/types/image';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent implements OnInit {
  archivos: FileModel[] = [];
  @Input() item: ElementId = {} as ElementId;
  @Input() singleUpload = false;
  estaSobreElemento = false;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  constructor(private fileSvc: FileService) { }


  ngOnInit(): void {
  }
  borrarElementos() {
    this.archivos = [];
    }
  async cargarImagenes() {
    //console.log("saving image with SingleUpload: "+this.singleUpload)
   const upload = this.fileSvc.cargarImagenesFirebase(this.archivos, "test").then(()=>{
      console.log("FILE uploaded");
      //this.borrarElementos();
      console.log("value of item uploadimage: ",this.item);
      //(<HTMLInputElement> document.getElementById("imgToggle")).click();
    }).catch((error)=>{
       console.log("ERROR AL SUBIOR:"+JSON.stringify(error))
    })
console.log("images upladed: ",JSON.stringify(upload));
   
//this.addImage.emit(imagenes);
 }
 guardar(form: any){
   console.log("saving: "+JSON.stringify(form))
 }
 uploadImage(){
  html2canvas(this.screen.nativeElement).then(canvas => {
    this.canvas.nativeElement.src = canvas.toDataURL();

    const base64 = canvas.toDataURL('image/jpeg', 1.0);
    
    canvas.toBlob((blob) => {
      if(blob!==null){
        const imageFile = new File([blob!], "testing", { type: 'image/png' });
        this.archivos[0] = new FileModel(imageFile);
        //this.archivos[0].archivo = imageFile;
        const upload = this.fileSvc.cargarImagenesFirebase(this.archivos, "testUpload").then(()=>{
          console.log("FILE uploaded");
          //this.borrarElementos();
          console.log("value of item uploadimage: ",this.item);
          //(<HTMLInputElement> document.getElementById("imgToggle")).click();
        }).catch((error)=>{
           console.log("ERROR AL SUBIOR:"+JSON.stringify(error))
        })
      }
     
    });

    
   

    this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
    this.downloadLink.nativeElement.download = 'marble-diagram.png';
    this.downloadLink.nativeElement.click();
  });
}
dataURItoBlob(dataURI: any) {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: 'image/png' });    
  return blob;
}
}
