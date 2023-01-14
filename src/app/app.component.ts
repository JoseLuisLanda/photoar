import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ElementId } from './collections/element';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FotosService } from 'src/app/shared/services/fotos.service'
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges  {
  @Output() item: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  switchTemp: boolean  = false;
  title = 'Visualiz-AR';
  itemAR:ElementId={uid:"sky",name:"../../../assets/models/Astronaut.glb"};
  fotos?: ElementId[]=[];
  subfotos?: ElementId[];
  myPhoto?: ElementId;
  photoNumber = "";
  textError = "";

  constructor(private fotosService: FotosService) {}
 

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.fotosService.getAll().snapshotChanges().pipe(map((changes: any[]) =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.fotos = data;
      

    });

    this.item
  }
  switchToFoto(){
    //console.log(this.fotos);
    if(this.fotos!.length > 0 && this.photoNumber !== ""){
      this.subfotos = this.fotos!.filter(obj => {
        return obj.name === this.photoNumber 
      })

      if(this.subfotos.length>0){
        this.itemAR = this.subfotos[0];
        this.switchTemp = true;
        //console.log("SwITCHING TO PHOTO");
      }else{
        console.log("no tienes fotos que coincidan");
        this.textError = "no tienes fotos que coincidan";
      }
      
    }else{
      console.log("empty field to search");
      this.textError = "no tienes fotos que coincidan";
    }
    
  }
  receiveModel(modelName: string){
    //console.log("otro modelo received: " + modelName);
    this.itemAR.name = modelName;
  }
  switchTemplate(){
    this.switchTemp = !this.switchTemp;
  }
}
