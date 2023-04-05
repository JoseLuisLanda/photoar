import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ElementId } from 'src/app/collections/element';
import { FotosService } from '../services/fotos.service';
import { User } from 'firebase/auth';
import { AfsService } from '../services/afs.service';
import { arrayUnion } from 'firebase/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logged = false;
  verified = false;
  messageSent = false;
  element = "foto";
  itemCode = "";
  errormsg = "";
  user: any;
  fbUser: ElementId; 
  showSearchBtn = false;
  elements : ElementId[]=[{uid: "1", name: "Foto"},{uid: "2", name: "Tarjeta"},{uid: "2", name: "Playera"}];
  items : ElementId[]=[];
  constructor(private authLogin: AuthService,private fotosService: FotosService, private afsService: AfsService) { }

  ngOnInit(): void {
    this.checkUserIsVerified();
    //console.log("init verified: "+this.verified);
  }
  ngOnchanges(){
    this.checkUserIsVerified();
   // console.log("changes verified: "+this.verified);
  }

  private async checkUserIsVerified(): Promise<void> {
   // console.log("USER"+JSON.stringify(JSON.parse(localStorage.getItem('user')!)));
    this.fbUser = JSON.parse(localStorage.getItem('user')!);
    const userDta = await this.authLogin.isAuthenticated();
    if (userDta && userDta.emailVerified) {
      this.logged = true;
      this.verified = true;
      this.user = userDta!;
      //console.log("user verified: "+this.verified);
    } else if (userDta) {
      this.logged = true;
    } else {
      this.logged = false;
      this.verified = false;
    }
    if(userDta?.uid !== undefined){
      
      //this.usuario = true;
      //this.getUserProfile(userDta?.uid)
    }else{
      //this.usuario = false;
      //console.log("No user"+JSON.stringify(userDta))
    }
    this.messageSent = false;
  }
  reloadPage(){
    window.location.reload();
  }
  verifyEmail(){
    this.authLogin.SendVerificationMail();
    this.messageSent = true;
    (<HTMLInputElement> document.getElementById("sendVerification")).disabled = true;
  }
  setFolderSearch(event:any){
    this.element = event.target.value.toLowerCase();
    this.showSearchBtn = true;
    //console.log("showsearchbtn"+this.element);
  }
  
  searchItem(){
    
    
    this.errormsg = "";
    //console.log("user in: "+this.user.uid)
    if(this.itemCode !== "")
    this.fotosService.getCollection(this.element, 50,"code",this.itemCode).subscribe((data) => {
      if(data !== undefined && data.length > 0){
        
        this.items =   data as ElementId[];
        this.itemCode ="";
        (<HTMLInputElement> document.getElementById("inputSearch")).value = "";
        (<HTMLInputElement> document.getElementById("btnCollapse")).click();
        //this.showSearchBtn = false;
        
        //console.log("element: "+JSON.stringify(data));
      }else{
        this.errormsg = "No existen elementos para tu código";
      }
      
    });
  }
  saveItemUser(id: string){
    if(this.user)
    {
      const items = {
        items: arrayUnion(this.element+"/"+id)
       };
       const owner = {
        owner: this.user.uid
       };
      const updateUser = this.authLogin.setUserItems("users",this.user.uid,items);
      const updateItem = this.authLogin.setUserItems("playera",id,owner);
      
      //const saveElement = 
    }
  }
}
