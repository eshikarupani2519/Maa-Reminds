import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missed-dosage',
  templateUrl: './missed-dosage.component.html',
  styleUrls: ['./missed-dosage.component.css']
})
export class MissedDosageComponent {
  constructor(private router:Router){
        
      }
      meds = [
        { name: 'Aspirin - 500 mg', time: '9:00 AM' ,startDate:'19/10/25',endDate:'19/10/25'},
        { name: 'Metformin - 500 mg', time: '2:00 PM' ,startDate:'19/10/25',endDate:'19/10/25'},
        { name: 'Ibuprofen - 200 mg', time: '8:00 PM',startDate:'19/10/25',endDate:'19/10/25' }
      ];
    
      addPill(){
        this.router.navigate(['add-medicine'])
      }

      goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
