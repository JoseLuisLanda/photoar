import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ElementId } from 'src/app/collections/element';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: ElementId = {} as ElementId;
  recordarme = false;
  ruta = 'usuario';
  passwordConfirm = '';
  logged = false;
  verified = false;
  roles = [
    {id: 1, name: "Visitante/Aspirante"},
    {id: 2, name: "Administrativo"},
    {id: 3, name: "Ingenieria"},
    {id: 4, name: "Licenciatura"},
    {id: 5, name: "Maestría"}
  ];
  constructor(private authLogin: AuthService,
    private router: Router) { }
    ngOnInit(): void {
    
      this.user.title = "Visitante/Aspirante";
    }
  
    async onSubmit(form: NgForm): Promise<void> {
      if (form.invalid) {
        return;
      }
      //console.log("forma: "+JSON.stringify(form.value));
      try {
        if (this.user.password !== this.passwordConfirm) {
          return;
        }
        const user = await this.authLogin.SignUp(this.user.email!, this.user.password);
        //if (user) {
          //this.router.navigate(['/home']);
        //}
      } catch (error) {
        console.log(error);
      }
    }
  
    private async checkUserIsVerified(): Promise<void> {
      const userDta = await this.authLogin.isAuthenticated();
      if (userDta && userDta.emailVerified) {
        this.logged = true;
        this.verified = true;
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
    }
    goToHome(){
      this.router.navigateByUrl('/home');
    }
    loginFace(): void {
      /*this.authLogin
        .FacebookAuth()
        .then((val) => {
          this.router.navigateByUrl('/home');
        })
        .catch((error) => {
          this.router.navigateByUrl('/login');
        });*/
    }
  
    loginGmail(): void {
      this.authLogin
        .GoogleAuth()
        .then((val) => {
          this.router.navigateByUrl('/home');
        })
        .catch((error) => {
          this.router.navigateByUrl('/login');
        });
    }

}
