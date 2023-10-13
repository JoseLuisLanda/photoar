import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AfelementComponent } from './shared/afelement/afelement.component';
import { ARElementComponent } from './shared/arelement/arelement.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { WebSpeechComponent } from './shared/web-speech/web-speech.component';
import { ProductsComponent } from './shared/products/products.component';
import { ElementformComponent } from './shared/elementform/elementform.component';

const routes: Routes = [
  {path: 'arelement', component: ARElementComponent,canActivate:[AuthGuard]},
  {path: 'afelement', component: AfelementComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'newItem', component: ElementformComponent,canActivate:[AuthGuard]},
  {path: 'speech', component: WebSpeechComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule1 { }
