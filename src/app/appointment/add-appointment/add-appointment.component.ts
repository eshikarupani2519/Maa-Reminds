// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-add-appointment',
//   templateUrl: './add-appointment.component.html',
//   styleUrls: ['./add-appointment.component.css']
// })
// export class AddAppointmentComponent {
// addAppointment=new FormGroup({
//     name:new FormControl("",[Validators.required]),
//     clinicName:new FormControl("",[Validators.required]),
//     Date:new FormControl('',[Validators.required]),
//     timing:new FormControl('',[Validators.required]),
//     purpose:new FormControl('')
//   })
// getFormControl(name:string){
//   return this.addAppointment.get(name);
// }
// isFormControlError(name:string){
//   return this.getFormControl(name)?.errors?.['required'] && this.getFormControl(name)?.dirty
// }
// checkPassword()
// {
//   return this.getFormControl('password')?.value != this.getFormControl('confirmPassword')?.value
//   && this.getFormControl('password')?.dirty && this.getFormControl('confirmPassword')?.dirty &&
//   this.getFormControl('password')?.touched && this.getFormControl('confirmPassword')?.touched
// }
//  submitData(){
//     console.log(this.addAppointment.value)
//     let value=this.addAppointment.value;
//     // this.databaseService.insertUser(value);
//     // console.log(this.databaseService.selectUsers())
//     this.addAppointment.reset()
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointment.service'; 

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  addAppointmentForm: FormGroup;
  appointmentId: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.addAppointmentForm = this.fb.group({
      doctorName: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.appointmentId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.appointmentId) {
      this.isEditMode = true;
      this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
        next: (appointment) => {
          this.addAppointmentForm.patchValue(appointment);
        },
        error: (error) => {
          console.error('Error fetching appointment for edit:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.addAppointmentForm.valid) {
      if (this.isEditMode && this.appointmentId) {
        this.appointmentService.updateAppointment(this.appointmentId, this.addAppointmentForm.value).subscribe({
          next: (response) => {
            console.log('Appointment updated successfully', response);
            alert('Appointment updated successfully!');
            this.router.navigate(['/appointment-reminder']);
          },
          error: (error) => {
            console.error('Error updating appointment:', error);
            alert('Failed to update appointment.');
          }
        });
      } else {
        this.appointmentService.addAppointment(this.addAppointmentForm.value).subscribe({
          next: (response) => {
            console.log('Appointment added successfully', response);
            alert('Appointment added successfully!');
            this.router.navigate(['/appointment-reminder']);
          },
          error: (error) => {
            console.error('Error adding appointment:', error);
            alert('Failed to add appointment.');
          }
        });
      }
    }
  }
}