import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginModel } from '../auth.model';
import { CookieServices } from 'src/app/services/cookie.service';
import { AuthInterceptor } from 'src/app/auth.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted:boolean = false;
  isWorking:boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private cookieService: CookieServices) {
  }

  loginForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
    }
  );

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.isWorking = true;
    this.loginForm.disable();

    const loginData = new LoginModel(
      this.loginForm.value.email!, 
      this.loginForm.value.password!
    )

    this.authService.userLogin(loginData).subscribe({
			next: (v) => {
        let token = v.token.value;
        this.cookieService.storeCookie("auth", token, "/");
        localStorage.setItem("auth", token);
        AuthInterceptor.token = token;
        this.router.navigate(['/app']);

			},
			error: (e) => {
				let message = e.error.message;
        this.isWorking = false;
        this.loginForm.enable();
				
        if (message) {
          this.toast.error(message);
        } else {
          this.toast.error("An unknown error occurred. Please try again")
        }
			},
		});
  }
}
