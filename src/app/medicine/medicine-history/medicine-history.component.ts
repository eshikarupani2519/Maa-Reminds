// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-medicine-history',
//   templateUrl: './medicine-history.component.html',
//   styleUrls: ['./medicine-history.component.css']
// })
// export class MedicineHistoryComponent {
//   constructor(private router:Router){
      
//     ngOnInit() {
//   this.pillsService.getMedicineHistory().subscribe({
//     next: (data) => {
//       this.meds = data;
//     },
//     error: (err) => {
//       console.error(err);
//     }
//   });
// }

//     }
//     // meds = [
//     //   { name: 'Aspirin - 500 mg', time: '9:00 AM' ,startDate:'19/10/25',endDate:'19/10/25'},
//     //   { name: 'Metformin - 500 mg', time: '2:00 PM' ,startDate:'19/10/25',endDate:'19/10/25'},
//     //   { name: 'Ibuprofen - 200 mg', time: '8:00 PM',startDate:'19/10/25',endDate:'19/10/25' }
//     // ];
  
//   goToDashboard() {
//     this.router.navigate(['/dashboard']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PillsService } from '../pills.service';  // ✅ Import service';

@Component({
  selector: 'app-medicine-history',
  templateUrl: './medicine-history.component.html',
  styleUrls: ['./medicine-history.component.css']
})
export class MedicineHistoryComponent implements OnInit {

  meds: any[] = [];   // ✅ Declare array

  constructor(
    private router: Router,
    private pillsService: PillsService   // ✅ Inject service
  ) {}

  ngOnInit(): void {   // ✅ Outside constructor
    this.loadMedicineHistory();
  }

  loadMedicineHistory() {
    this.pillsService.getMedicineHistory().subscribe({
      next: (data:any) => {
        this.meds = data;
        console.log('Medicine History:', data);
      },
      error: (err:any) => {
        console.error('Error fetching medicine history:', err);
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
