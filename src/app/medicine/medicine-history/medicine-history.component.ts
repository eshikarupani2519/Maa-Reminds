import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine-history',
  templateUrl: './medicine-history.component.html',
  styleUrls: ['./medicine-history.component.css']
})
export class MedicineHistoryComponent {
  constructor(private router:Router){
      
    }
    meds = [
      { name: 'Aspirin - 500 mg', time: '9:00 AM' ,startDate:'19/10/25',endDate:'19/10/25'},
      { name: 'Metformin - 500 mg', time: '2:00 PM' ,startDate:'19/10/25',endDate:'19/10/25'},
      { name: 'Ibuprofen - 200 mg', time: '8:00 PM',startDate:'19/10/25',endDate:'19/10/25' }
    ];
  
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
