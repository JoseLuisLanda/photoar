import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  async canActivate(){
    const user = await this.auth.isAuthenticated();
    if ( user ){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
