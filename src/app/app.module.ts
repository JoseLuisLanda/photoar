import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ARHeaderComponent } from './shared/arheader/arheader.component';
import { ARElementComponent } from './shared/arelement/arelement.component';
import { AnnotationsComponent } from './shared/annotations/annotations.component';
import { AfelementComponent } from './shared/afelement/afelement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ElementcardComponent } from './shared/elementcard/elementcard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadimageComponent } from './shared/uploadimage/uploadimage.component';
import { HttpClientModule } from '@angular/common/http';
import { NgDropFilesDirective } from '../app/directives/ng-drop-files.directive';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ElementToImgComponent } from './shared/element-to-img/element-to-img.component';
import { ElementformComponent } from './shared/elementform/elementform.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { WebSpeechModule } from './shared/web-speech/web-speech.module';


@NgModule({
  declarations: [
    AppComponent,
    ARHeaderComponent,
    ARElementComponent,
    AnnotationsComponent,
    AfelementComponent,
    HomeComponent,
    ModalComponent,
    ElementcardComponent,
    UploadimageComponent,
    NgDropFilesDirective,
    ElementToImgComponent,
    ElementformComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    WebSpeechModule// for firestore
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
