// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [LoginComponent]
//     });
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { RegisterService } from '../register/register.service'; // ✅ Import Service
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
    return this.loginForm.get(name)?.touched && this.loginForm.get(name)?.errors?.['required'];
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.inValidCredentials = true;
      return;
    }

    this.registerService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        alert('Login successful!');
        this.inValidCredentials = false;

        // ✅ Store user info (optional)
        localStorage.setItem('user', JSON.stringify(res.user));

        // ✅ Navigate to dashboard/home
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert(err.error?.message || 'Login failed!');
        this.inValidCredentials = true;
      },
    });
  }

  navigateToForgotPW() {
    this.router.navigate(['forgotPW']);
  }
}
