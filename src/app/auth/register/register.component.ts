import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 usernameError:any=false;
  // constructor(private HttpClient:HttpClient){

  // } this is against the convention to directly communicate with backend hence we take help of service
  constructor(private registerService: RegisterService,private router: Router){

  }
  //  ngOnInit(){
  //   this.subscribeToUserNameChanges();
  // }
regFormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  phone:new FormControl('',[Validators.required]),
  fullName:new FormControl('',[Validators.required]),
  password:new FormControl('',[Validators.required]),
  confirmPassword:new FormControl('',[Validators.required]),
 age:new FormControl('',[Validators.required]),
  familyMemberName:new FormControl('',[Validators.required]),
  familyMemberPhone:new FormControl('',[Validators.required]),
  otp: new FormControl('', [Validators.required])
  
})
navigateToPage(page: string) {
  this.router.navigate([page]);
}
getFormControl(name:string){
  return this.regFormGroup.get(name);
}
isFormControlError(name:string){
  return this.getFormControl(name)?.errors?.['required'] && this.getFormControl(name)?.dirty
}

checkPassword()
{
  return this.getFormControl('password')?.value != this.getFormControl('confirmPassword')?.value
  && this.getFormControl('password')?.dirty && this.getFormControl('confirmPassword')?.dirty &&
  this.getFormControl('password')?.touched && this.getFormControl('confirmPassword')?.touched
}
sendOtp() {
  const email = this.regFormGroup.get('email')?.value;

  this.registerService.sendOtp({ email }).subscribe({
    next: () => alert('OTP sent'),
    error: (err:any) => alert(err.error?.message)
  });
}
 submitData(){
    // console.log(this.regFormGroup.value)
    // let value=this.regFormGroup.value;
    // // this.databaseService.insertUser(value);
    // // console.log(this.databaseService.selectUsers())
    // this.regFormGroup.reset()
     
    if (this.regFormGroup.invalid || this.checkPassword()) {
      alert('Please fill all fields correctly');
      return;
    }
  

//   subscribeToUserNameChanges(){
//     this.regFormGroup.get('username')?.valueChanges.subscribe
//     ((value:any)=>{
//       // let users=this.databaseService.selectUsers();
//       // for(let user of users){
//       //   if(value && user.username.trim()===value.trim()){
//       //     this.usernameError=true;
//       //     break;
//       //   }else{
//       //     this.usernameError=false;
//       //   }
//       // }
//     })
//   }
// }
const userData = this.regFormGroup.value;

    // ✅ Send data to backend using service
    this.registerService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        alert('Registration successful!');
        this.regFormGroup.reset();
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert(err.error?.message || 'Registration failed!');
      },
    });
  }

  subscribeToUserNameChanges() {
    this.regFormGroup.get('fullName')?.valueChanges.subscribe((value: any) => {
      // You can later add logic to check if username exists (by calling backend)
      this.usernameError = false; // Placeholder for now
    });
  }
}
