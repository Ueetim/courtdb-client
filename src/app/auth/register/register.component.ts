import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupModel } from '../auth.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submitted = false;
  isWorking = false;

  selectedOption!: string;

  options = [
    { id: 'Magistrate court', name: 'Magistrate court' },
    { id: 'Family court', name: 'Family court' },
    { id: 'Customary court', name: 'Customary court' },
    { id: 'Juvenile court', name: 'Juvenile court' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService) {
  }

  signupForm = new FormGroup(
    {
      name: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    },
    {
      validators: this.MatchValidator,
    }
  );

  get f() {
    return this.signupForm.controls;
  }

  MatchValidator(control: AbstractControl): any {
    const password: string = control.get("password")!.value; // get password from our password form control
    const confirmPassword: string = control.get("confirmPassword")!.value; // get password from our confirmPassword form control

    // if the confirmPassword value is null or empty, don't return an error.
    if (!confirmPassword?.length) {
      return null;
    }

    // compare the passwords and see if they match.
    if (password !== confirmPassword) {
      control.get("confirmPassword")!.setErrors({ mismatch: true });
      return;
    } else {
      return null;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.isWorking = true;
    this.signupForm.disable();

    const signupData = new SignupModel(
      this.signupForm.value.name!, 
      this.signupForm.value.location!, 
      this.signupForm.value.type!,
      this.signupForm.value.email!, 
      this.signupForm.value.password!
    )

    this.authService.userRegistration(signupData).subscribe({
			next: (v) => {
        this.toast.success(v.message);
        this.router.navigate(['/auth/login']);
			},
			error: (e) => {
				let message = e.error.message;
        this.isWorking = false;
        this.signupForm.enable();
				
        if (message) {
          this.toast.error(message);
        } else {
          this.toast.error("An unknown error occurred. Please try again")
        }
			},
		});
  }
}
