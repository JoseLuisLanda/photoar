import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ElementId } from '../collections/element';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FotosService } from 'src/app/shared/services/fotos.service'
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from "html2canvas"; 
//import * as html2canvas from 'html2canvas';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
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
  folderToSearch = "foto";
  showCodeDiv = true;
  users = [{},{},{},{}];
  location:string = "general";
  uploadimage: boolean = true;
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  constructor( private router: Router, private activeRoute: ActivatedRoute, private fotosService: FotosService) { }
  ngAfterViewInit(){
    //console.log(this.screen)
 }
  ngOnInit(): void {
    this.activeRoute.queryParams
    .subscribe(params => {
      //console.log(params); // { orderby: "location" }
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
            (<HTMLInputElement> document.getElementById("collapseOne")).setAttribute("class","show");
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
      (<HTMLInputElement> document.getElementById("collapseOne")).setAttribute("class","show");
      
      this.textError = "no existe contenido para este lugar";
    }
    
    //console.log("GETTING chat messages: "+JSON.stringify(this.users));
  });
  

  }
  getARElement(){
    this.textError = "";
    //this.getElements(this.place.toLowerCase());
    console.log("foldersearch: "+this.folderToSearch+" elementnumber"+this.elementNumber);
    if(this.elementNumber !== ""){
      console.log("sending request: ");
      this.fotosService.getCollection(this.folderToSearch, 50,"description",this.elementNumber.toLowerCase()).subscribe((data) => {
        console.log("getting data: ");
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
      this.textError = "ingresa un código VÁLIDO";
    }
   
    
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
  showmyCodeDiv(value:boolean, type:string){
    console.log("Type ",type);
    this.folderToSearch = type;
    this.showCodeDiv = value;
  }
  changePlace(place:string){
    console.log("receiving: "+place);
    this.location = place;
    this.getElements("lugares");
    (<HTMLInputElement> document.getElementById("showingModal")).click();
  }
  downloadImage(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }
}


