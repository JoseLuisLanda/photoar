import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { WebSpeechModule } from './shared/web-speech/web-speech.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { ModalComponent } from './shared/modal/modal.component';
import { ElementcardComponent } from './shared/elementcard/elementcard.component';
import { ElementformComponent } from './shared/elementform/elementform.component';
import { UploadimageComponent } from './shared/uploadimage/uploadimage.component';
import { SearchComponent } from './shared/search/search.component';
import { DataService } from './services/dataservice';
import { AfelementComponent } from './shared/afelement/afelement.component';
import { ARElementComponent } from './shared/arelement/arelement.component';
import { ARHeaderComponent } from './shared/arheader/arheader.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    WebSpeechModule,
    CommonModule,
    ReactiveFormsModule
   
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ARHeaderComponent,
    ARElementComponent,
    AfelementComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
