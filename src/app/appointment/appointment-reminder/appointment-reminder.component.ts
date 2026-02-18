import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-reminder',
  templateUrl: './appointment-reminder.component.html',
  styleUrls: ['./appointment-reminder.component.css']
})
export class AppointmentReminderComponent implements OnInit {
  appointments: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        // Log the data to see what the backend is returning
        console.log('Appointments data from backend:', data);
        
        // Ensure data is an array before assigning it
        if (Array.isArray(data)) {
          this.appointments = data;
        } else {
          this.appointments = []; // Assign an empty array if the response is not a valid array
        }
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
        this.appointments = []; // Ensure the array is empty on error
      }
    });
  }

  viewAppointment(id: string): void {
    this.router.navigate(['/appointment-info', id]);
  }
  
  navigateToPage(page: string): void {
    this.router.navigate([page]);
  }
}