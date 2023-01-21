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

  elements?: ElementId[]=[];
  lugares?: ElementId[]=[{uid: "2", name: "Fotos"}];
  subElements?: ElementId[];
  myPhoto?: ElementId;
  elementNumber = "";
  textError = "";
  place = "lugares";

  constructor(private fotosService: FotosService) {}


  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getElements("lugares");
  }

  getElements(type: string){
    this.fotosService.getAllItems(type).snapshotChanges().pipe(map((changes: any[]) =>
    changes.map(c =>
      ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    )
    )
    ).subscribe(data => {
      
      if(type == "lugares")
      this.lugares = data;
      else{
        console.log("getting elements: "+this.place);
       
        this.elements = data;
        console.log("switchtoplace: "+this.elements);
        if(this.elements!.length > 0 && this.elementNumber !== ""){
          this.subElements = this.elements!.filter(obj => {
            return obj.description == this.elementNumber 
          })
    
          if(this.subElements.length>0){
            this.itemAR = this.subElements[0];
            this.switchTemp = true;
            //console.log("SwITCHING TO PHOTO");
          }else{
            console.log("no tienes contenido que coincida");
            this.textError = "no tienes contenido para este lugar";
          }
          
        }else{
          console.log("empty field to search");
          this.textError = "no tienes contenido que coincida";
        }
      }
    });

  }
  switchToPlace(){
   
    this.getElements(this.place.toLowerCase());
   
    
  }
  receiveModel(modelName: string){
    //console.log("otro modelo received: " + modelName);
    this.itemAR.name = modelName;
  }
  switchTemplate(){
    this.switchTemp = !this.switchTemp;
  }
}
