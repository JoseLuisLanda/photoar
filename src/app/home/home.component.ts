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
  totalTranscript?: string;
  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();
  languages: string[] = languages;
  currentLanguage: string = defaultLanguage;

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
    console.log('getting places');
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

    this.serviceRecognition.speechNow('llamandote desde home');
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
  ngOnInit(): void {
    this.emailConfirmed = this.authSvc.isLoggedIn;
    this.activeRoute.queryParams.subscribe((params) => {
      //console.log(params); // { orderby: "location" }
      this.elements = [];
      if (params.caller !== undefined) {
        this.location = params.code !== undefined ? params.code : 'general';
        this.getElements(params.type);
      } else if (params.type !== undefined && params.code !== undefined) {
        this.location = params.code;
        this.folder = params.type;
        //console.log(this.location); // location
        this.fotosService
          .getCollection(this.folder, 50, '', '', 'codes', this.location)
          .subscribe((data) => {
            if (data !== undefined && data.length > 0) {
              this.elements = data as ElementId[];
              this.itemAR = this.elements[0];
              //this.itemAR.type = "place";
              this.switchTemp = true;
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
      if (params.code !== undefined) {
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
      }
    });
  }

  gotTo(page: string) {
    this.router.navigateByUrl('/' + page);
  }
  ngOnChanges() {
    this.emailConfirmed = this.authSvc.isLoggedIn;
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
              }
              break;
          }
        } else {
          (<HTMLInputElement>(
            document.getElementById('collapseOne')
          )).setAttribute('class', 'show');

          this.textError = 'no existe contenido para este lugar';
        }

        //console.log("GETTING chat messages: "+JSON.stringify(this.users));
      });
  }
  getARElement() {
    this.textError = '';
    //this.getElements(this.place.toLowerCase());
    //console.log("foldersearch: "+this.folderToSearch+" elementnumber"+this.elementNumber);
    if (this.elementNumber !== '') {
      console.log('sending request: ');
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
            this.itemAR.type = 'place';
            this.switchTemp = true;
            //console.log("img elements: "+JSON.stringify(this.elements))
          }
          //console.log("GETTING chat messages: "+JSON.stringify(this.users));
        });
    } else {
      this.textError = 'ingresa un código VÁLIDO';
    }
  }
  switchToPlace(event: any) {
    //console.log("otro modelo received: " + JSON.stringify(event));

    this.itemAR = event;
    this.itemAR.type = 'photos';
    this.switchTemp = true;
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

    this.getElements(event.toLowerCase());
  }
  showmyCodeDiv(value: boolean, type: string) {
    //console.log("Type ",type);
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
    this.uploadimage = false;
    this.caller = 'Lugares';
    this.isForm = false;
  }
}
