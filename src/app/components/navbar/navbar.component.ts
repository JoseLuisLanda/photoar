import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { ElementId } from 'src/app/collections/element';
import { DataService } from 'src/app/services/dataservice';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus: any;
  public listTitles: any[];
  public location: Location;
  public user$: Observable<any> = this.authService.afAuth.user;
  @Input() itemSearch: ElementId = {name:"example",description:"hola", normalizedName:""} as ElementId;
  @Output() itemSelected: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  isLogged: boolean = false;
  code = "";
  place: string = "negocio";
  lugares: ElementId[] = [{ uid: '1', name: 'Negocios', description: 'negocio' },
  { uid: '2', name: 'Productos', description: 'producto' },
  { uid: '3', name: 'Servicios', description: 'servicio' },
  { uid: '4', name: 'Restaurantes', description: 'restaurantes' },
  { uid: '5', name: 'Museos', description: 'museos' },
  { uid: '6', name: 'Turismo', description: 'turismo' }];
  private subscription: Subscription[]= [];

  constructor(private authService: AuthService, private dataService: DataService, location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
    //this.dataService.setfolderSearch("negocio");
    this.subscription.push(this.authService.isLoggedStatus$.subscribe((dta)=>{
      this.isLogged = dta;
      
    }))
    this.subscription.push(this.dataService.selectedFolder$.subscribe((data)=>{
      this.place = data;
    }))
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
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
      this.itemSelected.emit(this.itemSearch);
    }
    //this.checkoutForm.reset();
    //this.itemSearch.code = this.code;
  }
  selectChange(folder: ElementId){
    this.place = folder.description!;
    this.dataService.setfolderSearch(folder.description!);
    console.log('Your order has been changed'+this.place);
   // this.dataService.setItem(this.itemSearch);
    //this.itemSearch.normalizedName = folder;
  }
  async onLogin(form: NgForm) {
    //this.dataService.setItem(this.itemSearch);
   // console.log('Your order has been submitted'+this.code+" place: "+this.place);
    //this.checkoutForm.reset();
    if (!form.valid) {
      
    }
    
 
  }
  logout(){
    this.authService.SignOut();
  }
  ngOnDestroy() {
    this.subscription.forEach((elem)=>{
        elem.unsubscribe()
    }) 
}
}
