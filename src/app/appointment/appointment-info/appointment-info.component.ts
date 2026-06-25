import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.css']
})
export class AppointmentInfoComponent implements OnInit {
  appointment: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentService.getAppointmentById(id).subscribe({
        next: (data) => {
          this.appointment = data;
        },
        error: (error) => {
          console.error('Error fetching appointment:', error);
        }
      });
    }
  }

  editAppointment(id: string): void {
    this.router.navigate(['/add-appointment', id]);
  }
    goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  deleteAppointment(id: string): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: (response) => {
          console.log('Appointment deleted successfully:', response);
          alert('Appointment deleted successfully!');
          this.router.navigate(['/appointment-reminder']);
        },
        error: (error) => {
          console.error('Error deleting appointment:', error);
          alert('Failed to delete appointment.');
        }
      });
    }
  }
}