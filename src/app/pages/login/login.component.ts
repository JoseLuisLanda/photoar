import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {
      
      if (this.authenticationService.isLoggedIn) {
        //this.router.navigate(['/']);
    }

    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  ngOnDestroy() {
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.error = '';
    this.loading = true;
    console.log(this.f.username.value, this.f.password.value);
    Swal.showLoading();
    this.authService
      .SignIn(this.f.username.value, this.f.password.value)
      .then((res) => {
        if (!res) {
          Swal.fire('Error al iniciar sesión ', 'error');
          console.log('error login: ' + res);
        } else {
          Swal.close();
          //this.router.navigate(['/home']);
        }
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        Swal.fire('Error al iniciar sesión', error.message, 'error');
        console.log('error login: ' + error);
      });
   /* this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from route parameters or default to '/'
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
            },
            error: error => {
                this.error = error;
                this.loading = false;
            }
        });*/
}

   login(){
    console.log("Values");
  //Swal.showLoading();
  let timerInterval:any;
  Swal.showLoading();
  try {
     this.authService
      .SignIn(this.f.username.value, this.f.password.value)
      .then((res) => {
        /*if (res.code) {
          Swal.fire('Error al iniciar sesión', res.message, 'error');
          console.log('error login: ' + res);
        } else {
          Swal.close();
          this.router.navigate(['/home']);
        }*/
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        Swal.fire('Error al iniciar sesión', error.message, 'error');
        console.log('error login: ' + error);
      });
  } catch (error) {
    console.log('error login: ' + error);
  }

  Swal.fire({
    title: 'Iniciando sesión!',
    html: 'Time out <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer()!.querySelector('b')
      timerInterval = setInterval(() => {
        b!.textContent = Swal.getTimerLeft()!.toString()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  }
}
