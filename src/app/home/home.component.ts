import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ElementId } from '../collections/element';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FotosService } from 'src/app/shared/services/fotos.service'
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
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
  elements: ElementId[]=[];
  lugares: ElementId[]=[{uid: "2", name: "Foto", description:"foto"}];
  codes: ElementId = {uid:""};
  subElements?: ElementId[];
  myPhoto?: ElementId;
  elementNumber = "";
  textError = "";
  caller="Lugares";
  place = "lugares";
  showCodeDiv = true;
  users = [{},{},{},{}];
  location:string = "gral";
  constructor( private router: Router, private activeRoute: ActivatedRoute, private fotosService: FotosService) { }

  ngOnInit(): void {
    this.activeRoute.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "location" }
      if(params.location !== undefined)
      {
        this.location = params.location;
        console.log(this.location); // location
        this.fotosService.getCollection("lugares", 50,"","","codes",params.location).subscribe((data) => {
          if(data !== undefined)
          
          this.lugares =   data.filter(obj => {
            return obj.normalizedName != "general"
          });
          this.codes = data.find(obj => {
            return obj.normalizedName == "general"
          });
          //console.log("GETTING chat messages: "+JSON.stringify(this.users));
        });
      }else{
        this.fotosService.getCollection("lugares", 50,"","","codes","general").subscribe((data) => {
          if(data !== undefined)
          this.lugares =   data.filter(obj => {
            return obj.normalizedName != "general"
          });
          this.codes = data.find(obj => {
            return obj.normalizedName == "general"
          });
          
          //console.log("GETTING chat messages: "+JSON.stringify(this.users));
        });
      }
      
    }
  );
    //functionality to get all places for dropdown
    //this.getElements("lugares");
    //this.getElements("foto");
   // console.log(this.fotosService.getCollection());
   
    
  }
  gotTo(page: string){
    this.router.navigateByUrl('/'+page);
  }
  getElements(type: string){
   this.textError = "";
   this.fotosService.getCollection(type, 50,"","","codes",this.location).subscribe((data) => {
    this.elements = [];
    if(data !== undefined && data.length > 0)
    {
      switch (type){
          case "lugares":
            this.lugares =   data.filter(obj => {
              return obj.normalizedName != "general"
            });
            this.codes = data.find(obj => {
              return obj.normalizedName == "general"
            });
            break;
            default:
            this.elements =   data.filter(obj => {
              return obj.name != "default"
            });
            
            if(this.elements!.length<1)
             {
              this.textError = "no existe contenido para este lugar";
             }
            break;
      }
     
    }else{
      
      
      this.textError = "no existe contenido para este lugar";
    }
    (<HTMLInputElement> document.getElementById("collapseOne")).setAttribute("class","show");
    //console.log("GETTING chat messages: "+JSON.stringify(this.users));
  });
    /*this.fotosService.getAllItems(type).snapshotChanges().pipe(map((changes: any[]) =>
    changes.map(c =>
      ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    )
    )
    ).subscribe(data => {
      //filtering only active or type of firs dropdown TODO
      if(type == "lugares"){
        this.lugares = data.filter(obj => {
          return obj.status == true
        });
      }
      else{
       // console.log("getting elements: "+this.place);
        this.elements = data.filter(obj => {
          return obj.name != "default"
        });
       // console.log("getting elements: "+this.elements);
        if(this.elements!.length<1)
        {
          this.textError = "no existe contenido para este lugar";
        }
      }
     
    });*/

  }
  switchToPhoto(){
    this.textError = "";
    //this.getElements(this.place.toLowerCase());
    if(this.elementNumber !== ""){
      
      this.fotosService.getCollection("foto", 50,"description",this.elementNumber.toLowerCase()).subscribe((data) => {
        if(data !== undefined)
        this.elements =   data as ElementId[];
        if(this.elements!.length <1){
          this.textError = "No hay contenido para este código";
        }else{
          
          this.itemAR = this.elements[0];
        this.itemAR.type = "place";
        this.switchTemp = true;
          console.log("img elements: "+JSON.stringify(this.elements))
        }
        //console.log("GETTING chat messages: "+JSON.stringify(this.users));
      });
    }else{
      this.textError = "ingresa un código";
    }
    
    //validating if there is a foto with code provided as description

    
    
   /* if(this.elements!.length > 0 && this.elementNumber !== ""){
      this.subElements = this.elements!.filter(obj => {
        return obj.description == this.elementNumber 
      })

      if(this.subElements.length>0){
        this.itemAR = this.subElements[0];
        this.itemAR.type = "place";
        this.switchTemp = true;
        //console.log("SwITCHING TO PHOTO");
      }else{
        console.log("no tienes contenido que coincida");
        this.textError = "no tienes contenido que coincida";
      }
      
    }else{
      console.log("empty field to search");
      this.textError = "no tienes contenido que coincida";
    }*/
    
  }
  switchToPlace(event: any){
    //console.log("otro modelo received: " + JSON.stringify(event));
    
    this.itemAR = event;
    this.itemAR.type = "photos";
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
   
      this.getElements( event.toLowerCase());
  }
  onSelectBtn(event: string){
    //getting elements every onchange places dropdown fires
    this.textError = "";
 
      this.getElements( event.toLowerCase());
  }
  showmyCodeDiv(value:boolean){
    this.showCodeDiv = value;
  }
  changePlace(place:string){
    console.log("receiving: "+place);
    this.location = place;
    this.getElements("lugares");
    (<HTMLInputElement> document.getElementById("showingModal")).click();
  }
}
