import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition:any

@Injectable({
  providedIn: 'root'
})
export class speechrecognition {

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords!: string;

  constructor() { }

  init() {

    this.recognition.continuous = true;
    this.recognition.lang = 'es-mx';
    this.recognition.interimResult = false;
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
        const synth = window.speechSynthesis;
        const speech = new SpeechSynthesisUtterance(texto);
        speech.volume = 1;
        speech.rate = 0.8;
        speech.pitch = 0.4;
        speech.lang = 'es-ES';
       // speech.text = "hola mundo tamira";
       // synth.speak(speech);
        synth.speak(speech);
        console.log(texto);
    }


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