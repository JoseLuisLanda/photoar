import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ElementId } from 'src/app/collections/element';
import { DataService } from 'src/app/services/dataservice';
import { AuthService } from 'src/app/shared/services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [

  { path: '/landing', title: 'Inicio',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Search',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Locación',  icon:'ni-pin-3 text-orange', class: '' },
    //{ path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/speech', title:"Asistente",  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/3delement', title: 'Modelos 3D',  icon:'ni-world text-pink', class: '' },
    { path: '/qrelement', title: 'Escanear QR',  icon:'ni-tablet-button text-blue', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Registro',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;
  public menuItems: any[];
  public isCollapsed = true;
  itemSearch: ElementId = {name:"example",description:"hola", normalizedName:""} as ElementId;
  code = "";
  isLogged: boolean = false;
  place: string = "negocio";
  lugares: ElementId[] = [{ uid: '1', name: 'Negocios', description: 'negocio' },
  { uid: '2', name: 'Restaurantes', description: 'restaurantes' },
  { uid: '3', name: 'Museos', description: 'museos' },
  { uid: '4', name: 'Turismo', description: 'turismo' },
  { uid: '5', name: 'Item', description: 'item' },
  { uid: '6', name: 'Educación', description: 'educacion' }];
  subscription: Subscription;

  constructor(private router: Router,
    private authService: AuthService, private dataService: DataService) {
      this.subscription = this.authService.isLoggedStatus$.subscribe((dta)=>{
        this.isLogged = dta;
        
      })
     }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    //this.dataService.setItem(this.itemSearch);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  onSubmit(): void {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
   // console.warn('Your order has been submitted'+this.code+" place: "+this.place);
    if(this.code.replace(" ","") !== ""){
      this.itemSearch.normalizedName = this.place;
      this.itemSearch.code = this.code.toLowerCase().replace(" ","");
      this.itemSearch.type = "search";
      console.log("setting data");
      this.dataService.setItem(this.itemSearch);
      this.isCollapsed = true;
    }
    //this.checkoutForm.reset();
    //this.itemSearch.code = this.code;
  }
  selectChange(folder: ElementId){
    this.place = folder.description!;
    console.log('Your order has been changed'+this.place);
   // this.dataService.setItem(this.itemSearch);
    //this.itemSearch.normalizedName = folder;
  }
  onSelectChange(dato: string){

  }
  signOut(){
    console.log("signout")
    this.authService.SignOut();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
