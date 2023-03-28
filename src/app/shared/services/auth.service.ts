import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, switchMap } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AfsService } from './afs.service';
import { ElementId } from '../../collections/element';
import { UserModel } from '../../collections/user.model';
import { RoleValidator } from '../../helpers/roleValidator';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends RoleValidator{
  //private url: string = 'urlApi';
  //private apiKey: string = 'apiKey';
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI';
  credentialEmail : any;
  public userToken: string = '';
  userData: any

  constructor(public afAuth: AngularFireAuth,
    private http: HttpClient,
    private db: AngularFirestore,
    private afsService : AfsService,
    public router: Router,
  ) {
  super();
  this.afAuth.authState.subscribe((user) => {
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user')!);
    } else {
      localStorage.setItem('user', 'null');
      JSON.parse(localStorage.getItem('user')!);
    }
  });
 
}

SignIn(email: string, password: string) {
  return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.SetUserData(result.user);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['home']);
        }
      });
    })
    .catch((error) => {
      window.alert(error.message);
    });
}
// Sign up with email/password
SignUp(email: string, password: string) {
  return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign 
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error.message);
    });
}
// Send email verfificaiton when new user sign up
SendVerificationMail() {
  return this.afAuth.currentUser
    .then((u: any) => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
}
// Reset Forggot password
ForgotPassword(passwordResetEmail: string) {
  return this.afAuth
    .sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    })
    .catch((error) => {
      window.alert(error);
    });
}
// Returns true when user is looged in and email is verified
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user')!);
  return user !== null && user.emailVerified !== false ? true : false;
}
// Sign in with Google
GoogleAuth() {
  return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
    this.router.navigate(['dashboard']);
  });
}
// Auth logic to run auth providers
AuthLogin(provider: any) {
  return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.router.navigate(['dashboard']);
      this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error);
    });
}
/* Setting up user data when sign in with username/password, 
sign up with username/password and sign in with social auth  
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
SetUserData(user: any) {
  const userRef: AngularFirestoreDocument<any> = this.afsService.doc(
    `users/${user.uid}`
  );
  const userData: any = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
  return userRef.set(userData, {
    merge: true,
  });
}
// Sign out
SignOut() {
  return this.afAuth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  });
}




  isAuthenticated() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<ElementId> = this.db.doc(
      `usuario/${user.uid}`
    );
    user.password = "";
    user.normalizedName = user.displayName.toLowerCase();
    user.photoURL = user.photoURL ? user.photoURL : 'assets/photo';
    user.refreshToken = user.refreshToken ? user.refreshToken : '';
    user.organization = user.email!.split('@')[1];
    user.type = user.email!.split('@')[1] === "upt.edu.mx" ? "interno":"user";
    user.url = `usuario/${user.uid}`;
  
    //console.log("storing: ", JSON.stringify(user));
    return userRef.set(user, { merge: true });
  }
}
