import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent {
  constructor(private router:Router){
        
      }
      appointments = [
        { name: 'Dr Tisha', time: '9:00 AM' ,date:'19/10/25'},
        { name: 'Dr Eshika', time: '2:00 PM' ,date:'19/10/25'},
        { name: 'Dr Anshu', time: '8:00 PM',date:'19/10/25'}
      ];

    goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
