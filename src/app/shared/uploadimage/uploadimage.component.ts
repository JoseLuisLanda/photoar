import { Component, Input, OnInit } from '@angular/core';
import { ElementId } from 'src/app/collections/element';
import { FileModel } from 'src/app/collections/file.model';
import { FileService } from '../services/file.service';


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
}
