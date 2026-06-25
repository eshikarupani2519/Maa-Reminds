// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-forgot-pw',
//   templateUrl: './forgot-pw.component.html',
//   styleUrls: ['./forgot-pw.component.css']
// })
// export class ForgotPWComponent {
// forgotPWForm=new FormGroup({
//   email:new FormControl('',[Validators.required,Validators.email])
// })
// getFormControl(name:string){
//     return this.forgotPWForm.get(name)
//   }
//   isFormControlError(name: string) {
//     return this.forgotPWForm.get(name)?.invalid && this.forgotPWForm.get(name)?.dirty
//   }
//   isEmailValid(email: string) {
//     return this.forgotPWForm.get(email)?.invalid && this.forgotPWForm.get(email)?.touched
//   }
//   isEmailRequired(name: string) {
//     return this.forgotPWForm.get(name)?.touched && this.forgotPWForm.get(name)?.errors?.['required']
//   }
//  submitForm(){
//     console.log(this.forgotPWForm.value)

//     // this.validateLogin(this.forgotPWForm.get('username')?.value,
//     // this.forgotPWForm.get('password')?.value)
//   }

// }
// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RegisterService } from '../register.service'; // ✅ Make sure path is correct

// @Component({
//   selector: 'app-forgot-pw',
//   templateUrl: './forgot-pw.component.html',
//   styleUrls: ['./forgot-pw.component.css']
// })
// export class ForgotPWComponent {
//   forgotPWForm = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     newPassword: new FormControl('', [Validators.required]),
//   });

//   constructor(private registerService: RegisterService, private router: Router) {}

//   getFormControl(name: string) {
//     return this.forgotPWForm.get(name);
//   }

//   isFormControlError(name: string) {
//     return this.forgotPWForm.get(name)?.invalid && this.forgotPWForm.get(name)?.dirty;
//   }

//   isEmailValid(name: string) {
//     return this.forgotPWForm.get(name)?.invalid && this.forgotPWForm.get(name)?.touched;
//   }

//   isEmailRequired(name: string) {
//     return this.forgotPWForm.get(name)?.touched && this.forgotPWForm.get(name)?.errors?.['required'];
//   }

//   submitForm() {
//     if (this.forgotPWForm.invalid) {
//       alert('Please fill in all required fields correctly.');
//       return;
//     }

//     this.registerService.forgotPassword(this.forgotPWForm.value).subscribe({
//       next: (res) => {
//         alert('Password updated successfully!');
//         this.router.navigate(['/login']);
//       },
//       error: (err) => {
//         console.error(err);
//         alert(err.error?.message || 'Something went wrong');
//       }
//     });
//   }
// }import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.css']
})
export class ForgotPWComponent {

  token!: string;

  forgotPWForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;
    console.log("Reset Token:", this.token);
  }

  passwordsMatch(): boolean {
    return this.forgotPWForm.value.newPassword ===
           this.forgotPWForm.value.confirmPassword;
  }
  navigateToPage(page: string) {
  this.router.navigate([page]);
}

  submitForm() {

    if (this.forgotPWForm.invalid || !this.passwordsMatch()) {
      alert('Please fix the errors');
      return;
    }

    const body = {
      newPassword: this.forgotPWForm.value.newPassword
    };

    this.http.post(
      `http://localhost:5000/api/auth/reset-password/${this.token}`,
      body
    ).subscribe({
      next: () => {
        alert('Password updated successfully!');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        alert(err.error?.message || 'Invalid or expired link');
      }
    });
  }
}
