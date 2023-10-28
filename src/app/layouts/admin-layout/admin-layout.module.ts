import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from 'src/app/home/home.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ElementcardComponent } from 'src/app/shared/elementcard/elementcard.component';
import { ElementformComponent } from 'src/app/shared/elementform/elementform.component';
import { SearchComponent } from 'src/app/shared/search/search.component';
import { UploadimageComponent } from 'src/app/shared/uploadimage/uploadimage.component';
import { NgDropFilesDirective } from 'src/app/directives/ng-drop-files.directive';
import { DataService } from 'src/app/services/dataservice';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ProductsComponent } from 'src/app/shared/products/products.component';
import { ElementToImgComponent } from 'src/app/shared/element-to-img/element-to-img.component';
import { ARElementComponent } from 'src/app/shared/arelement/arelement.component';
import { ARHeaderComponent } from 'src/app/shared/arheader/arheader.component';
import { AnnotationsComponent } from 'src/app/shared/annotations/annotations.component';
import { AfelementComponent } from 'src/app/shared/afelement/afelement.component';
import { WebSpeechComponent } from 'src/app/shared/web-speech/web-speech.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ModalComponent,
    ElementcardComponent,
    ElementformComponent,
    NgDropFilesDirective,
    ElementcardComponent,
    UploadimageComponent,
    NgDropFilesDirective,
    ElementToImgComponent,
    ElementformComponent,
    HeaderComponent,
    DashboardComponent,
    ProductsComponent,
    SearchComponent,
    UploadimageComponent,
    AnnotationsComponent,
  
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminLayoutModule {}
