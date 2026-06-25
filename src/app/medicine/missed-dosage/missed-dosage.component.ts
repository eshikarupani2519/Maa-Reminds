// // import { Component } from '@angular/core';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-missed-dosage',
// //   templateUrl: './missed-dosage.component.html',
// //   styleUrls: ['./missed-dosage.component.css']
// // })
// // export class MissedDosageComponent {
// //   constructor(private router:Router){
        
// //       }
// //       meds = [
// //         { name: 'Aspirin - 500 mg', time: '9:00 AM' ,startDate:'19/10/25',endDate:'19/10/25'},
// //         { name: 'Metformin - 500 mg', time: '2:00 PM' ,startDate:'19/10/25',endDate:'19/10/25'},
// //         { name: 'Ibuprofen - 200 mg', time: '8:00 PM',startDate:'19/10/25',endDate:'19/10/25' }
// //       ];
    
// //       addPill(){
// //         this.router.navigate(['add-medicine'])
// //       }

// //       goToDashboard() {
// //     this.router.navigate(['/dashboard']);
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Component({
//   selector: 'app-missed-dosage',
//   templateUrl: './missed-dosage.component.html',
//   styleUrls: ['./missed-dosage.component.css']
// })
// export class MissedDosageComponent implements OnInit {

//   meds: any[] = [];

//   constructor(
//     private router: Router,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     this.loadMissedDosages();
//   }

//   loadMissedDosages() {

//     const token = localStorage.getItem('token');

//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });

//     this.http.get<any[]>(
//       'http://localhost:5000/api/users/missed-dosages',
//       { headers }
//     )
//     .subscribe({
//       next: (data) => {
//         this.meds = data;
//         console.log('Missed dosages:', data);
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
//   }

//   addPill() {
//     this.router.navigate(['add-medicine']);
//   }

//   goToDashboard() {
//     this.router.navigate(['/dashboard']);
//   }
// }
// src/app/missed-dosage/missed-dosage.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-missed-dosage',
  templateUrl: './missed-dosage.component.html',
  styleUrls: ['./missed-dosage.component.css']
})
export class MissedDosageComponent implements OnInit {

  meds: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadMissedDosages();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadMissedDosages(): void {
    this.http
      .get<any[]>(
        'http://localhost:5000/api/users/missed-dosages',
        { headers: this.getHeaders() }
      )
      .subscribe({
        next: (data) => {
          this.meds = data;
          console.log('Missed dosages:', data);
        },
        error: (err) => {
          console.error('Error fetching missed dosages:', err);
        }
      });
  }

  addPill(): void {
    this.router.navigate(['add-medicine']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}