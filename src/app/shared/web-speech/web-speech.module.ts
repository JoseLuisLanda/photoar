import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { WebSpeechComponent } from './web-speech.component';


@NgModule({
  declarations: [WebSpeechComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class WebSpeechModule { }
