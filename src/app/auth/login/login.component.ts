// // import { Component } from '@angular/core';
// // import { FormControl, FormGroup, Validators } from '@angular/forms';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent {
// //   currentUsername:string=''
// //   inValidCredentials:any=false;
// //   constructor(private router:Router) { }


// //  loginForm = new FormGroup({
// //     username: new FormControl('', [Validators.required]),
// //     password: new FormControl(''),
// //     email: new FormControl('', [Validators.email, Validators.required])
// //   })
// //   // ngOnInit() {
// //   //   this.subscribeToUsername();
// //   // }
// //   getFormControl(name:string){
// //     return this.loginForm.get(name)
// //   }
// //   isFormControlError(name: string) {
// //     return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.dirty
// //   }
// //   isEmailValid(email: string) {
// //     return this.loginForm.get(email)?.invalid && this.loginForm.get(email)?.touched
// //   }
// //   isEmailRequired(name: string) {
// //     return this.loginForm.get(name)?.touched && this.loginForm.get(name)?.errors?.['required']
// //   }
// //  submitForm(){
// //     console.log(this.loginForm.value)

// //     this.validateLogin(this.loginForm.get('username')?.value,
// //     this.loginForm.get('password')?.value)
// //   }
// // navigateToForgotPW(){
// //   this.router.navigate(['forgotPW'])
// // }
// //   validateLogin(username:any,password:any){
// //     // let users=this.DatabaseService.selectUsers();
// //     // for(let user of users){
// //     //   if(user.username===username && user.password===password){
       
        
// //     //     this.DatabaseService.updateLoggedIn(true);
// //     //     this.DatabaseService.updateLoggedInUser(username);
// //     //     this.router.navigate(['home'])
       
// //     //   }else{
// //     //     this.inValidCredentials=true;
       
// //     //   }
// //     // }
// //   }
// // }
// // // this.router.navigate(['home'])
// // //navigate mai array dena padtay agar bina array krnay toh navigateByUrl


// //   // subscribeToUsername() {
// //   //   this.loginForm.get('username')?.valueChanges.subscribe((value:any) => {
// //   //     console.log(value)
// //   //   })
// //   // }
// //   // checkData(){
// //   //   this.AuthService.checkData().subscribe((response:any)=>{
// //   //     response.forEach((resp:any) => {
// //   //       if(resp.email===this.loginForm.value.email && resp.username===this.loginForm.value.username && resp.password===this.loginForm.value.password)
// //   //     {
// //   //       console.log('valid')
// //   //       alert('login success!');
// //   //       this.router.navigate(['home']);
// //   //     }
// //   //     });
      
// //   //   })
// //   // }
  

// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RegisterService } from '../register.service'; // ✅ Import Service

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   inValidCredentials = false;

//   constructor(private router: Router, private registerService: RegisterService) {}

//   // ✅ Only use email & password (no username, backend does not need it)
//   loginForm = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required]),
//   });

//   getFormControl(name: string) {
//     return this.loginForm.get(name);
//   }

//   isFormControlError(name: string) {
//     return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.dirty;
//   }

//   isEmailValid(name: string) {
//     return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.touched;
//   }

//   isEmailRequired(name: string) {
//     return (
//       this.loginForm.get(name)?.touched &&
//       this.loginForm.get(name)?.errors?.['required']
//     );
//   }

//   // ✅ This will run when you click login
//   submitForm() {
//     console.log('Login button clicked! ✅');
//     console.log('Form Data:', this.loginForm.value);

//     if (this.loginForm.invalid) {
//       this.inValidCredentials = true;
//       return;
//     }

//     // ✅ Call backend API
//     this.registerService.loginUser(this.loginForm.value).subscribe({
//       next: (res: any) => {
//         console.log('✅ Login successful:', res);
//         alert('Login successful!');
//         this.inValidCredentials = false;

//         // ✅ Save user data
//         if (res.user) {
//           localStorage.setItem('user', JSON.stringify(res.user));
//         }

//         // ✅ Navigate to Home/Dashboard
//         this.router.navigate(['dashboard']);
//       },
//       error: (err: any) => {
//         console.error('❌ Login error:', err);
//         alert(err.error?.message || 'Login failed!');
//         this.inValidCredentials = true;
//       },
//     });
   
//   }

//   navigateToForgotPW() {
//     this.router.navigate(['forgotPW']);
//   }
// }


import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inValidCredentials = false;

  constructor(private router: Router, private registerService: RegisterService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  getFormControl(name: string) {
    return this.loginForm.get(name);
  }

  isFormControlError(name: string) {
    return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.dirty;
  }

  isEmailValid(name: string) {
    return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.touched;
  }

  isEmailRequired(name: string) {
    return (
      this.loginForm.get(name)?.touched &&
      this.loginForm.get(name)?.errors?.['required']
    );
  }
navigateToPage(page: string) {
  this.router.navigate([page]);
}
  submitForm() {
    console.log('Login button clicked! ✅');
    console.log('Form Data:', this.loginForm.value);

    if (this.loginForm.invalid) {
      this.inValidCredentials = true;
      return;
    }

    this.registerService.loginUser(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('✅ Login successful:', res);
        alert('Login successful!');
        this.inValidCredentials = false;


        // Save the JWT token to local storage
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        // Save user data 
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user._id));
        }
        
        
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        console.error('❌ Login error:', err);
        alert(err.error?.message || 'Login failed!');
        this.inValidCredentials = true;
      },
    });
  }

  navigateToForgotPW() {
    this.router.navigate(['forgotPW']);
  }
}