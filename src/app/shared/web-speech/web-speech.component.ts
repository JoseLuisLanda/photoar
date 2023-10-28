import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { defaultLanguage, languages } from '../../model/languages';
import { SpeechError } from '../../model/speech-error';
import { SpeechEvent } from '../../model/speech-event';
import { SpeechRecognizerService } from '../services/speech-recognizer.service';
import { environment } from 'src/environments/environment';
import { SpeechNotification } from '../../model/speech-notification';
import Typed from 'typed.js';
import { SearchParams } from 'src/app/model/searchparams';
import { Router } from '@angular/router';
import { speechrecognition } from '../services/speechrecognition.service';
import { OpenAI } from 'openai';
import { error } from 'console';

@Component({
  selector: 'wsa-web-speech',
  templateUrl: './web-speech.component.html',
  styleUrls: ['./web-speech.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebSpeechComponent implements OnInit {
  languages: string[] = languages;
  currentLanguage: string = defaultLanguage;
  totalTranscript?: string;
  avatarUrl: string ="../../../assets/avatars/avatartel.png";
  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();
  errorPromp: string = "";
   openai = new OpenAI({
    apiKey: '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', dangerouslyAllowBrowser: true
});

  constructor(private router: Router,
    private speechRecognizer: SpeechRecognizerService,
    public serviceRecognition: speechrecognition,
   // private actionContext: ActionContext
  ) {}
  ngOnDestroy(): void{
    this.speechRecognizer.stop();
  }
  ngOnInit(): void {
    const webSpeechReady = this.speechRecognizer.initialize(this.currentLanguage);
    if (webSpeechReady) {
      this.initRecognition();
    }else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
    }
    //configuring typed instance
    const typed = new Typed('#element', {
      strings: [
        'Muestrame turismo en tulancingo',
        'Ver museos en tulancingo',
        'Quiero ver turismo en huapalcalco'
      ],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
      loop: true
    });
    //init listening 
    this.start();
   // this.generateArrivalText("hola como estas, generame una lista de 3 productos para el cuidado del cabello");
  }

  startSpeech(cadena: string) {
    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.serviceRecognition.speechNow(cadena);
  }
  public async generateResposeFromChatGPT(message: string) {
    const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message}]
    }).then((response)=>{
      console.log("response "+response.choices[0].message.content);
      
      this.startSpeech(response.choices[0].message.content!);
    }).catch((error)=>{
      console.log("response "+error);
      //this.errorMessage$ = of(error);
      this.startSpeech(error);
    })
    
    //console.log(completion.choices[0].message.content);
}
  /*public async chat(message: string): Promise<string> {
    try {
      // Use chatgpt.query method with optional parameters
      const response = await this.chatgpt.sendPrompt(message)
      // Return the response text
      console.log("CHATGPT RESPONSE: "+response);
      return response.message;
    } catch (error) {
      // Handle any errors
      console.error(error);
      console.log("CHATGPT error: "+error);
      return 'Something went wrong.';
    }
  }*/
  start(): void {
    this.avatarUrl = "../../../assets/avatars/avatarfind.png"
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    if(this.errorMessage$)
    this.avatarUrl = "../../../assets/avatars/avatartel.png"
    this.speechRecognizer.stop();
  }

  selectLanguage(language: string): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
    }
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition(): void {
    this.transcript$ = this.speechRecognizer.onResult().pipe(
      tap((notification) => {
        this.processNotification(notification);
      }),
      map((notification) => notification.content || '')
    );

    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.errorMessage$ = merge(
      this.speechRecognizer.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }
  goToHome(){
    this.router.navigateByUrl('/home');
  
  }
  private processNotification(notification: SpeechNotification<string>): void {
    //call output
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      this.output(message);
     // this.actionContext.processMessage(message, this.currentLanguage);
      // this.actionContext.runAction(message, this.currentLanguage);
      this.totalTranscript = this.totalTranscript
        ? `${this.totalTranscript}\n${message}`
        : notification.content;
        this.stop();
    }
  }
  output(input: string) {
    let product;
  
    // Regex remove non word/space chars
    // Trim trailing whitespce
    // Remove digits - not sure if this is best
    // But solves problem of entering something like 'hi1'
  
    let text = input.toLowerCase().replace(/[\d]/gi, "").trim();
    text = text
      .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
  
    /*if (this.compare(environment.prompts, text)) { 
      // Search for exact match in `prompts`
      product = this.compare(environment.prompts,  text);
    } else if (text.match(/gracias/gi)) {
      product = "De nada!"
    } else {
      // If all else fails: random alternative
      //product = environment.alternative[Math.floor(Math.random() * environment.alternative.length)];
    }*/
    this.compare(text);
    return product;
  }
  analize(){
    this.compare("anuncios en tulancingo");
  }
  cleaningS(input: string): string{
      return input.endsWith("s")? input.substring(0, input.length - 1) : input ;
  }
  compare(string:string): boolean {
    let reply;
    let commandAccepted = false;
    var commandsArray:SearchParams={caller:"voice"};

    var arrString = string.split(" ");
    var commandKey = arrString[0];
    var folderSearch = "";
    var keepLoopingIndex0= false;

    //including key search at first
    if(environment.prompts.includes(arrString[0])){
      //including folder search at second
      console.log("entrando a key to search: ",this.cleaningS(arrString[1]));
      if(environment.folders.includes(this.cleaningS(arrString[1]))){
        console.log("entrando a key 2");
          commandsArray.fileToSearch = this.cleaningS(arrString[1]);
          for (let z = 2; z < arrString.length; z++) {//only if its a valid place
            //if(environment.places.includes(arrString[z])){
              if(arrString[z].length > 3){
              console.log("entrando a key 3");
                commandsArray.place = arrString[z];
               //commandsArray.place = "menu";
                break;
            }else console.log("lugares con key no incluye",arrString[z]);
      }
    }
    }
    if(environment.folders.includes(this.cleaningS(arrString[0]))){
      //if(true){
      console.log("entrando a no key");
      commandsArray.fileToSearch = this.cleaningS(arrString[0]);
      for (let z = 1; z < arrString.length; z++) {//only if its a valid place
       // if(environment.places.includes(arrString[z])){
          console.log("entrando a no key 2");
            commandsArray.place = arrString[z];
            //commandsArray.place = "menu";
          //  break;
        //}else console.log("lugares con file no incluye",arrString[z]);
  }
    }
    console.log(JSON.stringify(commandsArray));
    //launching search if there is a folder name valid search
    if(commandsArray.fileToSearch){
     // commandsArray.fileToSearch = "menu";
      //commandsArray.place = "menu";
      if(commandsArray.place){
        this.router.navigateByUrl('/home?type='+commandsArray.fileToSearch+'&code='+commandsArray.place+"&caller="+commandsArray.caller);
      }
      this.router.navigateByUrl('/home?type='+commandsArray.fileToSearch+'&code='+commandsArray.place+'&caller='+commandsArray.caller);
   
      
    }else{
     
      this.errorMessage$ = of("No escontre una respuesta valida para tu consulta");
      this.avatarUrl = "../../../assets/avatars/noresult.png"
      this.generateResposeFromChatGPT(string);
    }
    
    /*for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        //searching for key index 0
        if(x==0)
        {
          
            if(promptsArray[x][y] == commandKey){
              commandAccepted = true;
              keepLoopingIndex0 = true;
              console.log("found command match");
              break;
            }else if(keepLoopingIndex0){
             folderSearch = arrString[0];
              if(folderSearch.endsWith("s"))
                folderSearch = folderSearch.substring(0, folderSearch.length - 1);
              console.log("comparing folder name match: ",promptsArray[1][y]," ",folderSearch);
              if(promptsArray[1][y] == folderSearch){
                console.log("found folder name match");
                commandsArray.fileToSearch = folderSearch;
                  //searching for place only if arrayString contains a valid place and its between 1-3
              if(arrString.length <= 4){
                for (let z = 1; z < arrString.length; z++) {//only if its a valid place
                  if(environment.places.includes(arrString[z])){
                      commandsArray.place = arrString[z];
                      break;
                  }else console.log("no incluye",arrString[z]);
                }
              }
              console.log("VALUES TO SEARCH ",JSON.stringify(commandsArray));
                return true;
              }
            }
        }else{//searching for foldername index 1
          
          if(commandAccepted){
            folderSearch = arrString[1];
            if(folderSearch.endsWith("s"))
              folderSearch = folderSearch.substring(0, folderSearch.length - 1);
            if(promptsArray[x][y] == folderSearch){
              console.log("found folder name match");
              commandsArray.fileToSearch = folderSearch;
              if(arrString.length <= 5){
                for (let z = 2; z < arrString.length; z++) {//only if its a valid place
                  if(environment.places.includes(arrString[z])){
                      commandsArray.place = arrString[z];
                  }else console.log("no incluye",arrString[z]);
                }
              }
              console.log("VALUES TO SEARCH ",JSON.stringify(commandsArray));
              return true;
            }
          }else{
            console.log("no command match");
            return false;
          }
        }


      


        /*if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          // Stop inner loop when input value matches prompts
          break;
        }
      }
      
    }*/
    return false;
  }
}
