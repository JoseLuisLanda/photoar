import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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

  @Output() item: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  switchTemp: boolean = false;
  title = 'Visualiz-AR';
  itemAR: ElementId = {
    uid: 'sky',
    name: '../../../assets/models/Astronaut.glb',
  };
  elements: ElementId[] = [];
  lugares: ElementId[] = [{ uid: '2', name: 'Foto', description: 'foto' }];
  codes: ElementId = { uid: '', codes: ['general'] };
  subElements?: ElementId[];
  myPhoto?: ElementId;
  search: boolean = true;
  elementNumber = '';
  textError = '';
  caller = 'Lugares';
  place = 'lugares';
  folderToSearch = 'foto';
  showCodeDiv = true;
  users = [{}, {}, {}, {}];
  location: string = 'general';
  folder: string = 'lugares';
  uploadimage: boolean = true;
  userItem: UserModel = new UserModel();
  currentItem: any = {};
  isForm = false;
  creator = false;
  emailConfirmed = false;
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
  ngAfterViewInit() {
    //console.log(this.screen)
    this.emailConfirmed = this.authSvc.isLoggedIn;
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
  buscarLugares(){
   // console.log('getting places',this.location);
   
    this.fotosService
      .getCollection('lugares', 50, '', '', 'codes', this.location)
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
  }
  ngOnInit(): void {
   this.buscarLugares();
    this.emailConfirmed = this.authSvc.isLoggedIn;
    if(this.emailConfirmed)
    this.creator = this.authSvc.isAdmin(JSON.parse(localStorage.getItem('user')!));
    this.activeRoute.queryParams.subscribe((params) => {
      //console.log(params); // { orderby: "location" }
      this.elements = [];
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
        this.location = params.code !== undefined ? params.code : 'general';
        this.getElements(params.type);
      } 
      else if (params.type !== undefined && params.code !== undefined) {
       // console.log("type and code: ");
        this.location = params.code;
        this.folder = params.type;
        //confirmed then look for all cards with userid code
        if(this.emailConfirmed){
          
          const searchCards = this.onSelectBtn(this.folder);
         
          

        }else{//if user is not logged and email confirmed... once time access
        
        //console.log(this.location); // location
        this.fotosService
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
          });
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
  goToUrlWithParams(page: string, param:string) {
    this.router.navigate(
      [`/${page}`],
      {
        queryParams: { url: param },
        queryParamsHandling: 'merge' }
      );
  }
  gotTo(showPage: boolean) {
    if(showPage)
    {
      this.switchTemp = true;
      this.arelement = true;
    }else{
      this.switchTemp = false;
      this.arelement = false;
    }
    
    //this.router.navigateByUrl('/' + page);
  }
  ngOnChanges() {
    this.emailConfirmed = this.authSvc.isLoggedIn;

    if(this.elements.length > 0)
    (<HTMLInputElement>(
      document.getElementById('flush-headingOne')
    )).click();
     
  }
  getElements(type: string) {
    this.textError = '';
    this.fotosService
      .getCollection(type, 50, '', '', 'codes', this.location)
      .subscribe((data) => {
        this.elements = [];
        if (data !== undefined && data.length > 0) {
          switch (type) {
            case 'lugares':
              this.lugares = data.filter((obj) => {
                return obj.normalizedName != 'general';
              });
              this.codes = data.find((obj) => {
                return obj.normalizedName == 'general';
              });
              (<HTMLInputElement>(
                document.getElementById('collapseOne')
              )).setAttribute('class', 'show');
              break;
            default:
              this.elements = data.filter((obj) => {
                return obj.name != 'default';
              });

              if (this.elements!.length < 1) {
                this.textError = 'no existe contenido para este lugar';
               
              }/*else  
              (<HTMLInputElement>(
                document.getElementById('flush-headingOne')
              )).click();*/
              break;
              
          }
          
          this.buscarLugares();
        } else {
          (<HTMLInputElement>(
            document.getElementById('collapseOne')
          )).setAttribute('class', 'show');

          this.textError = 'no existe contenido para este lugar';
          this.buscarLugares();
        }

        //console.log("GETTING chat messages: "+JSON.stringify(this.users));
      });
      
  }
  getARElement() {
    this.textError = '';
    //this.getElements(this.place.toLowerCase());
    //console.log("foldersearch: "+this.folderToSearch+" elementnumber"+this.elementNumber);
    if (this.elementNumber !== '') {
      //console.log('sending request: ');
      this.fotosService
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
        });
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
  onSelectChange(event: string) {
    //getting elements every onchange places dropdown fires
    this.textError = '';

    this.getElements(event.toLowerCase());
  }
  onSelectBtn(event: string) {
    //getting elements every onchange places dropdown fires
    this.textError = '';
    //console.log("this.location= ", this.location);
    this.getElements(event.toLowerCase());
  }
  showmyCodeDiv(value: boolean, type: string) {
    //console.log("Type ",type);
    if(value){
      this.location = "general";
      this.getElements("lugares");
    }
    this.folderToSearch = type;
    this.showCodeDiv = value;
  }
  changePlace(place: string) {
    //console.log("receiving: "+place);
    this.location = place;
    this.getElements('lugares');
    (<HTMLInputElement>document.getElementById('showingModal')).click();
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
    this.search = true;
    this.uploadimage = false;
    this.caller = 'Lugares';
    this.isForm = false;
  }
  showItem(itemSelected: ElementId){
    this.caller = 'Detalle de '+itemSelected.name;
    this.search = false;
    this.itemAR = itemSelected;
    this.currentItem = itemSelected;
    
  }
}
