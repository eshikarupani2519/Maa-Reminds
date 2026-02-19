// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-appointment-history',
//   templateUrl: './appointment-history.component.html',
//   styleUrls: ['./appointment-history.component.css']
// })
// export class AppointmentHistoryComponent {
//   constructor(private router:Router){
        
//       }
//       appointments = [
//         { name: 'Dr Tisha', time: '9:00 AM' ,date:'19/10/25'},
//         { name: 'Dr Eshika', time: '2:00 PM' ,date:'19/10/25'},
//         { name: 'Dr Anshu', time: '8:00 PM',date:'19/10/25'}
//       ];

//     goToDashboard() {
//     this.router.navigate(['/dashboard']);
//   }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';  // ✅ Import service';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

  appointments: any[] = [];

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadAppointmentHistory();
  }

  loadAppointmentHistory() {
    this.appointmentService.getAppointmentHistory().subscribe({
      next: (data: any) => {
        this.appointments = data;
        console.log("Appointment History:", data);
      },
      error: (err: any) => {
        console.error("Error fetching appointment history:", err);
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
