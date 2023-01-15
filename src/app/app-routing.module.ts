import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AfelementComponent } from './shared/afelement/afelement.component';
import { ARElementComponent } from './shared/arelement/arelement.component';

const routes: Routes = [
  {path: 'arelement', component: ARElementComponent},
  {path: 'afelement', component: AfelementComponent},
  {path: '**', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
