import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ElementId } from 'src/app/collections/element';
import { AfsService } from '../services/afs.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public currentUser: ElementId = {uid:"",images:[{uid:"",url:"assets/img/no-profile.png"}]};
  imagePath = "assets/img/no-profile.png";
  constructor(private router: Router, private authSvc: AuthService,private afsService : AfsService) { }

  ngOnInit() {
   // this.checkUserIsVerified();
  }
  async onLogout() {
    try {
      await this.authSvc.SignOut();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  usuario?:boolean;

  async checkUserIsVerified() {
    const userDta = await this.authSvc.isAuthenticated();
    if (userDta && userDta.emailVerified) {
      this.router.navigate(['/home']);
    } else if (userDta) {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/login']);
    }
    if(userDta?.uid !== undefined){
      
      this.usuario = true;
      this.getUserProfile(userDta?.uid)
    }else{
      this.usuario = false;
      console.log("No user"+JSON.stringify(userDta))
    }
  }

  getUserProfile(userId: string){
    //let query = (ref:QueryFn<firebase.default.firestore.DocumentData>) => ref.where('name', '==', 'recargas');
   
   var doc = this.afsService.doc$(`usuario/${ userId }`).subscribe(res=>{
   this.currentUser = res as ElementId;
   localStorage.setItem("userId", this.currentUser.uid!);
    localStorage.setItem("userName", this.currentUser.displayName ? this.currentUser.displayName! : this.currentUser.email!);
   if(this.currentUser.images){
    this.imagePath = this.currentUser.images[0].url!;
   }else
   this.imagePath = this.currentUser.photoURL!;
  },err=>{console.log("error: "+err);})
  }

  goTo(url: string){
    this.router.navigateByUrl(`/${url}`);
  }

}
