import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import Typed from 'typed.js';
import { ElementId, Evento, Grupo, UserModel } from '../collections/element';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FotosService } from 'src/app/shared/services/fotos.service';
import { map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { Observable, Subject, merge, of } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { speechrecognition } from '../shared/services/speechrecognition.service';
import { SpeechRecognizerService } from '../shared/services/speech-recognizer.service';
import { SpeechError } from '../model/speech-error';
import { SpeechEvent } from '../model/speech-event';
import { defaultLanguage, languages } from '../model/languages';
import { SpeechNotification } from '../model/speech-notification';
import { environment } from 'src/environments/environment';
import { isBoolean } from 'util';
//import * as html2canvas from 'html2canvas';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [speechrecognition],
})
export class HomeComponent implements OnInit, AfterViewInit, OnChanges {
  currentMarkerIndex = 0;
  totalTranscript?: string;
  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();
  languages: string[] = languages;
  currentLanguage: string = defaultLanguage;
  afelement = false;
  arelement = false;
  models:ElementId[]=[];
  filter: string = "";

  @Output() item: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  switchTemp: boolean = false;
  title = 'Visualiz-AR';
  itemAR: ElementId = {
    uid: 'sky',
    name: '../../../assets/models/Astronaut.glb',
    type:"image",
    areas:[{name:"general",code:"general",normalizedName:"general"}],
    codes:["general"],
    images:[{name:"test1",type:"image"},{name:"test1",type:"image"}]
  };
  indexElements: ElementId[];
  elements: ElementId[] = [];
  filteredElements: ElementId[]=[];
  searchElements: ElementId[]=[];
  lugares: ElementId[] = [{ uid: '2', name: 'Foto', description: 'foto' }];
  codes: ElementId = { uid: '',areas:[{displayName:"general",name:"general",code:"general",normalizedName:"general"}],codes:["general"]};
  subElements?: ElementId[];
  myPhoto?: ElementId;
  search: boolean = true;
  elementNumber = '';
  textError = '';
  caller = 'Lugares';
  place = 'lugares';
  folderToSearch = 'item';
  showCodeDiv = true;
  users = [{}, {}, {}, {}];
  location: string = 'general';
  code: string = 'general';
  folder: string = 'item';
  uploadimage: boolean = true;
  userItem: UserModel = new UserModel();
  currentItem: ElementId = {name:"hola",description:"descr",type:"image", indexInit:0,images:[],codes:[]};
  newItem: ElementId = {name:"",description:"",type:"image", indexInit:0,images:[],codes:[]};
  isForm = false;
  creator = false;
  emailConfirmed = false;
  isAdminluis = false;
  generalSearch = false;
  folders: ElementId[]=[{ uid: '1', name: 'Producto3D', description: 'item' },{ uid: '2', name: 'Playera', description: 'playera' },{ uid: '3', name: 'Foto', description: 'foto' }];
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(
    private speechRecognizer: SpeechRecognizerService,
    public serviceRecognition: speechrecognition,
    private router: Router,
    private authSvc: AuthService,
    private activeRoute: ActivatedRoute,
    private fotosService: FotosService
  ) {
   

    //this.serviceRecognition.init()
  }
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev:KeyboardEvent) {
    // do something meaningful with it
    this.searchElements = this.elements;
    //console.log(`The user just pressed ${ev.key}!`);
  }
  ngAfterViewInit() {
   
    //console.log(this.screen)
    this.emailConfirmed = this.authSvc.isLoggedIn;
    this.isAdminluis = this.authSvc.isAdminLuis;
  }
  startService() {
    this.serviceRecognition.start();
  }

  stopService() {
    this.serviceRecognition.stop();
  }
  startSpeech() {
    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.serviceRecognition.speechNow('Había una vez un perrito cayejero llamado Pancho, vivía en la bulliciosa ciudad de México. Pancho era un perrito simpático y juguetón, pero a menudo se sentía solo y triste porque no tenía un hogar al que llamar suyo.');
  }
  start(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    this.speechRecognizer.stop();
  }
 /* buscarLugares(code: string){
   console.log('getting places',this.location);
   
    this.fotosService
      .getCollection('lugares', 50, '', '', 'codes', code)
      .subscribe((data) => {
        if (data !== undefined)
        data = data.sort((a,b)=>a.indexInit - b.indexInit)
          this.lugares = data.filter((obj) => {
         
            return obj.normalizedName != 'general';
          });
        this.codes = data.find((obj) => {
          return obj.normalizedName == code;
        });
        if(data.length>0)
          this.code = data[0].code;
        
        //console.log("GETTING chat messages: "+JSON.stringify(this.users));
      });
  }*/
 
  ngOnInit(): void {
   
    this.emailConfirmed = this.authSvc.isLoggedIn;
    if(this.emailConfirmed)
    this.creator = this.authSvc.isAdmin(JSON.parse(localStorage.getItem('user')!));

    //getting params
    this.activeRoute.queryParams.subscribe((params) => {
      //console.log(params); // { orderby: "location" }
      this.elements = [];
      this.searchElements = [];      //setting place
      this.folder = "lugares";
      if(params.place !== undefined){
        //console.log("setting place"+params.place);
        this.location = "lugares";
        this.code = params.place;
        
         
      }else{
        this.location = "lugares";
        this.code = "general";
      }
      


      if (params.type !== undefined && params.code !== undefined)
      this.generalSearch = params.type !== undefined && params.code !== undefined?false:true;
      this.getElements(this.generalSearch);
       // this.buscarLugares(this.location);
      if (params.url !== undefined) {
        var redirect = false;
        var type = "";
        
        //console.log("params: ", params.url);
        this.fotosService
        .getCollection('urls', 1, 'code', params.url)
        .subscribe((data) => {
          //console.log("data: ", JSON.stringify(data));
          if (data !== undefined && data.length > 0) {
            var mainElement:ElementId;
            this.elements = data as ElementId[];
            this.searchElements = this.elements;
            //console.log("ARELEMENT")
            mainElement = this.elements[0];
            this.models = this.elements[0].elements?this.elements[0].elements:[];
            this.itemAR = this.models[0];
            redirect = mainElement.redirect?mainElement.redirect:false;
            type = mainElement.type?mainElement.type:"";
            //console.log("redirect "+redirect+"type "+type);
            if(redirect && type == "model")
            {
              this.switchTemp = true;
              this.arelement = true;
            }
            
          }
        });
      }
      else if (params.caller !== undefined) {
        //e.log("caller: ");
        this.code = params.code !== undefined ? params.code : 'general';
        this.folder = params.type;
        this.getElements();
      } 
      else if (params.type !== undefined && params.code !== undefined) {
       // console.log("type and code: ");
      
      
        //confirmed then look for all cards with userid code
        if(this.emailConfirmed){
          
          const searchCards = this.onSelectBtn(this.folder);
         
          

        }else{//if user is not logged and email confirmed... once time access
         
          this.code = params.code;
          this.folder = params.type;
          //this.generalSearch = params.place !== undefined?true:false;
      this.getElements(this.generalSearch);
       
        //console.log(this.location); // location
        /*this.fotosService
          .getCollection(this.folder, 50, '', '', 'codes', this.location)
          .subscribe((data) => {
            if (data !== undefined && data.length > 0) {
              this.elements = data as ElementId[];
              this.itemAR = this.elements[0];
              
              this.switchTemp = true;
              this.afelement = true;
              //console.log("img elements: "+JSON.stringify(this.elements))
            }

            this.lugares = data.filter((obj) => {
              return obj.normalizedName != 'general';
            });
            this.codes = data.find((obj) => {
              return obj.normalizedName == 'general';
            });

            //console.log("GETTING chat messages: "+JSON.stringify(this.users));
          });*/
        }
      }
      else if(params.code !== undefined) {
        //console.log("code: ");
        this.fotosService
          .getCollection('lugares', 50, '', '', 'codes', 'general')
          .subscribe((data) => {
            if (data !== undefined)
              this.lugares = data.filter((obj) => {
                return obj.normalizedName != 'general';
              });
            this.codes = data.find((obj) => {
              return obj.normalizedName == 'general';
            });

            //console.log("GETTING chat messages: "+JSON.stringify(this.users));
          });
      }else{
        //console.log("No params");
        this.switchTemp = false;
            this.arelement = false;
      }
    
    });
  }
  onSelectBtn(event: string) {
    //getting elements every onchange places dropdown fires
    this.textError = '';
    //console.log("this.location= ", this.location);
    this.getElements();
  }
  goToUrlWithParams(page: string, param:string) {
    this.router.navigate(
      [`/${page}`],
      {
        queryParams: { url: param },
        queryParamsHandling: 'merge' }
      );
  }
  
  gotTo(showPage: boolean) {
    /*if(showPage)
    {
      this.switchTemp = true;
      this.arelement = true;
    }else{
      this.switchTemp = false;
      this.arelement = false;
    }*/
   
    window.location.reload();
    //this.router.navigateByUrl('/' + page);
  }
  gotToPage(page: string) {
   
    this.router.navigateByUrl('/' + page);
  }
  ngOnChanges() {
    
    this.emailConfirmed = this.authSvc.isLoggedIn;
    //console.log("onchanges"+this.filter);
    if(this.filter == "")
      this.searchElements = this.elements;
    if(this.elements.length > 0)
    (<HTMLInputElement>(
      document.getElementById('flush-headingOne')
    )).click();
     
  }
  //getting el.ements
getElements(generalSearch:boolean = false) {
    this.textError = '';

    console.log("searchfolder: "+this.folder+" location: "+this.code)
    const getElements = this.fotosService
      .getCollection(this.folder, 50, '', '', 'codes', this.code)
      .subscribe((data) => {
        this.elements = [];
        this.searchElements = [];
        //console.log("data: "+JSON.stringify(data))
        if (data !== undefined && data.length > 0) {
          //console.log("searchfolder: "+type+" location: "+this.location)
          data = data.sort((a,b) => {
            var anumber = a.indexInit?a.indexInit:0;
            var bnumber = b.indexInit?b.indexInit:0;
            return anumber - bnumber
          });
          switch (this.location) {
            case 'lugares':
              //console.log("this.codes before:"+JSON.stringify(this.codes)+ " this.code: "+this.code+" this.folder: "+this.folder);
              this.lugares = data.filter((obj) => {
                return !obj.codes.includes("lugares");
              });
              this.codes = data.find((obj) => {
                return obj.codes.includes("lugares");
              })?data.find((obj) => {
                return obj.codes.includes("lugares");
              }):this.codes;

              
              if(this.codes.areas === undefined || this.codes.areas === null || this.codes.areas.length < 1)
              this.codes.areas = [{name:"general",code:"general",normalizedName:"general"}];
              console.log("this.codes:"+JSON.stringify(this.codes));

             // (<HTMLInputElement>(document.getElementById('xcollapseOne'))).setAttribute('class', 'show');
              /*this.lugares = this.lugares.sort((a,b) => {
                var anumber = a.indexInit?a.indexInit:0;
                var bnumber = b.indexInit?b.indexInit:0;
                return anumber - bnumber
              });*/
              
              

              
              break;
            default:

              this.elements = data.filter((obj) => {
                return obj.name != 'default';
              });
              this.searchElements = this.elements;
              if (this.elements!.length < 1) {
                this.textError = 'no existe contenido para este lugar';
               
              }  
              //console.log("elementos: "+JSON.stringify(this.elements))//(<HTMLInputElement>(document.getElementById('accordionBtn') )).click();
              
              break;
              
          }
          if(this.lugares.length>0 && generalSearch){
            //console.log("sending search first place:"+JSON.stringify(this.codes));
             this.folder = this.lugares[0].normalizedName!;
             this.code = this.lugares[0].code? this.lugares[0].code:"general";
             this.getElements();
           }
          this.showmyCodeDiv(true, 'explorer')
          //this.buscarLugares();
        } else {
          /*(<HTMLInputElement>(
            document.getElementById('collapseOne')
          )).setAttribute('class', 'show');*/

          this.textError = 'no existe contenido para este lugar';
         // this.buscarLugares(this.place);
        }
        this.location = "";
        //console.log("GETTING chat messages: "+JSON.stringify(this.users));
      });
      
  }
  getARElement() {
    this.textError = '';
   
    //this.getElements(this.place.toLowerCase());
    //console.log("foldersearch: "+this.folderToSearch+" elementnumber"+this.elementNumber);
    if (this.elementNumber !== '') {
      //console.log('sending request: ');
      this.folder = this.elementNumber;
      this.getElements();
     /* this.fotosService
        .getCollection(
          this.folderToSearch,
          50,
          'description',
          this.elementNumber.toLowerCase()
        )
        .subscribe((data) => {
          //console.log("getting data: ");
          if (data !== undefined) this.elements = data as ElementId[];
          if (this.elements!.length < 1) {
            this.textError = 'No hay contenido para este código';
          } else {
            this.itemAR = this.elements[0];
            this.afelement = true;
            this.arelement = false;
            this.itemAR.type = 'photos';
            this.switchTemp = true;
           // console.log("img elements: "+JSON.stringify(this.elements))
          }
          //console.log("GETTING chat messages: "+JSON.stringify(this.users));
        });*/
    } else {
      this.textError = 'ingresa un código VÁLIDO';
    }
  }
  switchToPlace(event: any) {
    //console.log("otro modelo received: " + JSON.stringify(event));
    this.afelement = true;
    this.arelement = false;
    this.itemAR = event;
    this.itemAR.type = 'photos';
    this.switchTemp = true;
  }
  switchTo3D(event: any) {
    this.models=[];
    event.images.forEach((element: ElementId) => {
      this.models.push(element);
    });
    
    //this.itemAR = event;

   /* if(showPage)
    {*/
      this.switchTemp = true;
      this.arelement = true;
    /*}else{
      this.switchTemp = false;
      this.arelement = false;
    }*/
  }
  
  receiveModel(modelName: string) {
    //console.log("otro modelo received: " + modelName);
    this.itemAR.name = modelName;
  }
  switchTemplate() {
    this.switchTemp = !this.switchTemp;
  }
  //evento del dropdown de lugares
  onSelectChange(event: ElementId) {
    //getting elements every onchange places dropdown fires
    this.textError = '';
    this.folder = event.normalizedName?event.normalizedName:"general";
    this.code = event.code? event.code:"general";
    //this.folder assignation
    //console.log("this.code = "+this.code+" this.folder = "+this.folder)
    this.getElements();
  }
  onItemSelectChange(event: string) {
    //getting elements every onchange places dropdown fires
   
    this.folder = event;
    
   // console.log("folder to search: "+this.folderToSearch);
    this.textError = '';

   this.getElements();
  }
 
  showmyCodeDiv(value: boolean, type: string) {
    //console.log("Type ",type);
    if(value){
      //this.location = "general";
      
      if(type == "explore"){
        this.code = type;
        //this.getElements("lugares");
        this.setLugares();
      }
    }
    this.folderToSearch = type;
    this.showCodeDiv = value;
  }
  changePlace(place: ElementId) {
    console.log("receiving: "+JSON.stringify(place));
    this.code = place.code!;
    this.folder = place.normalizedName!;
    //this.folder = place.normalizedName!;
    //this.location = place.normalizedName!;
    //this.getElements();
    this.folder = "lugares";
    this.location  = "lugares";
    this.getElements(true);
  /*  if(place === "general")
    {
    this.code = "general";
    this.buscarLugares(place);
    }else{
      this.code = place;
      this.location = place;
      this.buscarLugares(this.location);
    }*/
   
    
    //this.getElements('lugares');
    (<HTMLInputElement>document.getElementById('dismissModal')).click();
  }
  downloadImage() {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }
  signUp() {
    this.uploadimage = false;
    this.caller = 'SingUp';
    this.isForm = true;
    this.currentItem = this.userItem;
    (<HTMLInputElement>document.getElementById('showingModal')).click();
  }
  setLugares() {
    //console.log("SETLUGARES: ")
    this.search = true;
    this.uploadimage = false;
    this.caller = 'Lugares';
    this.isForm = false;
  }
  addItem(){
    this.caller = 'Adding item';
    this.search = true;
    this.uploadimage = true;
    this.isForm = true;
    this.newItem = {name:"",description:"",type:"image", indexInit:0,images:[],codes:[]};
    this.newItem.codes?.push(this.code);
   // this.currentItem = environment.itemAR;
    
    //this.indexElements = 1;
  }
  showItem(itemSelected: ElementId, image: ElementId){
   
    this.caller = 'Detalle de '+itemSelected.name;
    this.search = false;
    this.itemAR = itemSelected;
    this.currentItem = itemSelected;
    this.indexElements = image.elements!;
    
  }
  buscarProd(){
    
    this.showCodeDiv = true;
    let normalizedWord = "";
    //console.log("String a buscar: "+this.filter);
    if(this.filter !== ""){
      normalizedWord = this.filter.replace(/\s/g, '').toLowerCase();
      this.filteredElements = this.elements.filter((obj) => {
        return obj.codes?.includes(normalizedWord);
      });
      this.searchElements = this.filteredElements;
     // (<HTMLInputElement>(7document.getElementById('accordionBtn')7)).click();
     // console.log("String a buscar: "+normalizedWord+" en "+this.folder);
    }
    else
    console.log("No valid string");

    //console.log("String a buscar: "+this.filter);
    const typed = new Typed('#element', {
      strings: [
        'Ropa de bebe',
        'Pantalon de mujer',
        'Zapatos',
        'Vestidos',
      ],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
      loop: true
    });
  }
}
