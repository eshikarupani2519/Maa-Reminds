// // import { Component } from '@angular/core';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-appointment-history',
// //   templateUrl: './appointment-history.component.html',
// //   styleUrls: ['./appointment-history.component.css']
// // })
// // export class AppointmentHistoryComponent {
// //   constructor(private router:Router){
        
// //       }
// //       appointments = [
// //         { name: 'Dr Tisha', time: '9:00 AM' ,date:'19/10/25'},
// //         { name: 'Dr Eshika', time: '2:00 PM' ,date:'19/10/25'},
// //         { name: 'Dr Anshu', time: '8:00 PM',date:'19/10/25'}
// //       ];

// //     goToDashboard() {
// //     this.router.navigate(['/dashboard']);
// //   }

// // }
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AppointmentService } from '../appointment.service';  // ✅ Import service';

// @Component({
//   selector: 'app-appointment-history',
//   templateUrl: './appointment-history.component.html',
//   styleUrls: ['./appointment-history.component.css']
// })
// export class AppointmentHistoryComponent implements OnInit {

//   appointments: any[] = [];

//   constructor(
//     private router: Router,
//     private appointmentService: AppointmentService
//   ) {}

//   ngOnInit(): void {
//     this.loadAppointmentHistory();
//   }

//   loadAppointmentHistory() {
//     this.appointmentService.getAppointmentHistory().subscribe({
//       next: (data: any) => {
//         this.appointments = data;
//         console.log("Appointment History:", data);
//       },
//       error: (err: any) => {
//         console.error("Error fetching appointment history:", err);
//       }
//     });
//   }

//   goToDashboard() {
//     this.router.navigate(['/dashboard']);
//   }
// }


// src/app/appointment-history/appointment-history.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

  appointments: any[] = [];
  upcomingAppointments: any[] = []; // active (not yet past)

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadAppointmentHistory();
    this.checkUpcomingAppointmentAlerts();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadAppointmentHistory(): void {
    this.appointmentService.getAppointmentHistory().subscribe({
      next: (data: any) => {
        this.appointments = data;
        console.log('Appointment History:', data);
      },
      error: (err: any) => {
        console.error('Error fetching appointment history:', err);
      }
    });
  }

  // Check active appointments — alert if any are within 1 day
  checkUpcomingAppointmentAlerts(): void {
    this.http
      .get<any[]>('http://localhost:5000/api/appointments', { headers: this.getHeaders() })
      .subscribe({
        next: (appointments) => {
          this.upcomingAppointments = appointments;

          const now = new Date();
          const oneDayMs = 24 * 60 * 60 * 1000;

          appointments.forEach((appt) => {
            if (!appt.date || !appt.time) return;

            const [hours, minutes] = appt.time.split(':').map(Number);
            const apptDate = new Date(appt.date);
            apptDate.setHours(hours, minutes, 0, 0);

            const diffMs = apptDate.getTime() - now.getTime();

            // Alert if appointment is between 0 and 24 hours from now
            if (diffMs > 0 && diffMs <= oneDayMs) {
              alert(
                `⚠️ Reminder: You have an appointment with Dr. ${appt.doctorName} tomorrow at ${appt.time}!`
              );
            }
          });
        },
        error: (err) => {
          console.error('Error fetching upcoming appointments:', err);
        }
      });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}