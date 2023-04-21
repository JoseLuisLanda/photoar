import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition:any;
declare var SpeechSynthesisUtterance:any;
declare var synth:any;

@Injectable({
  providedIn: 'root'
})
export class speechrecognition {

  recognition =  new webkitSpeechRecognition();
  speech =   new SpeechSynthesisUtterance();
  synth = window.speechSynthesis;
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords!: string;

  constructor() { }

  init() {
    
    this.recognition.continuous = true;
    this.recognition.lang = 'es-ES';
    this.recognition.interimResult = false;

        this.speech.volume = 1;
        this.speech.rate = 0.8;
        this.speech.pitch = 0.4;
        this.speech.lang = 'es-ES';

   /* this.recognition.addEventListener('result', (e: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });*/
    this.recognition.onresult = (event: { results: string | any[]; }) =>{
        
       
        var texto = event.results[event.results.length - 1][0].transcript;
     
        console.log(texto);
        this.stop();
        this.speechNow(texto);
    }


  }

  speechNow(text:string){
    this.speech.text = text;
    this.synth.speak(this.speech);
  }
  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}