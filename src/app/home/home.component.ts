import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ElementId } from '../collections/element';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FotosService } from 'src/app/shared/services/fotos.service'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  showCodeDiv = true;
  constructor( private router: Router, private fotosService: FotosService) { }

  ngOnInit(): void {
    this.getElements("lugares");
  }
  gotTo(page: string){
    this.router.navigateByUrl('/'+page);
  }
  getElements(type: string){
   this.textError = "";
    this.fotosService.getAllItems(type).snapshotChanges().pipe(map((changes: any[]) =>
    changes.map(c =>
      ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    )
    )
    ).subscribe(data => {
      
      if(type == "lugares")
      this.lugares = data;
      else{
       // console.log("getting elements: "+this.place);
        this.elements = data;
       // console.log("getting elements: "+this.elements);
        if(this.elements!.length<1)
        {
          this.textError = "no existe contenido para este lugar";
        }
      }
     
    });

  }
  switchToPhoto(){
   
    this.getElements(this.place.toLowerCase());
    //validating if there is a foto with code provided as description
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
        this.textError = "no tienes contenido que coincida";
      }
      
    }else{
      console.log("empty field to search");
      this.textError = "no tienes contenido que coincida";
    }
    
  }
  switchToPlace(event: any){
    //console.log("otro modelo received: " + JSON.stringify(event));
    this.itemAR = event;
        this.switchTemp = true;
  }

  receiveModel(modelName: string){
    //console.log("otro modelo received: " + modelName);
    this.itemAR.name = modelName;
  }
  switchTemplate(){
    this.switchTemp = !this.switchTemp;
  }
  onSelectChange(event: string){
    //getting elements every onchange places dropdown fires
    this.textError = "";
      if( event.toLowerCase() !=="foto"){
        this.showCodeDiv = false;
     
      }
      else{
        this.showCodeDiv = true;
        //enter and show input for code
        //(<HTMLInputElement> document.getElementById("codeForElement")).
        
       
      }
      this.getElements( event.toLowerCase());
  }
}
