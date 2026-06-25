// // src/app/medicine-reminder/medicine-reminder.ts
// import { Component, OnInit } from '@angular/core'; // <-- Import OnInit
// import { Router } from '@angular/router';
// import { PillsService } from '../pills.service'; // <-- Import the service
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Component({
//  selector: 'app-medicine-reminder',
//   templateUrl: './medicine-reminder.component.html',
//   styleUrls: ['./medicine-reminder.component.css']
// })
// export class MedicineReminderComponent implements OnInit { // <-- Implement OnInit
  
//   // meds is now initialized as an empty array
//   meds: any[] = []; 
//   pendingReminders:any[]=[];

//   // constructor(private router:Router, private pillsService: PillsService){
//   // }
//   constructor(
//  private router:Router,
//  private pillsService:PillsService,
//  private http:HttpClient
// ){}

  
//   // ADD THIS LIFECYCLE HOOK
//   // ngOnInit(): void {
//   //   this.fetchPills();
//   // }
//   ngOnInit(): void {

//    this.fetchPills();

//    this.fetchPendingReminders();

// }
//   goToDashboard() {
//     this.router.navigate(['/dashboard']);
//   }
//   goToMedicineInfo(medId:any){
//     this.router.navigate(['medicine-info',medId]);

//   }

//   fetchPills(): void {
//     this.pillsService.getPills().subscribe(
//       (pills) => {
//         // Assign the retrieved pills to the meds array
//         this.meds = pills;
//         console.log('Pills retrieved successfully:', this.meds);
//       },
//       (error) => {
//         console.error('Error fetching pills:', error);
//         // Handle error, e.g., show an error message to the user
//       }
//     );
//   }
//   fetchPendingReminders(){

//  const token =
//  localStorage.getItem('token');

//  const headers = new HttpHeaders({
//    Authorization:`Bearer ${token}`
//  });

//  this.http.get<any[]>(
//  'http://localhost:5000/api/users/pending-reminders',
//  {headers}
//  )
//  .subscribe(data=>{

//    this.pendingReminders=data;

//  });

// }

//   addPill(){
//     this.router.navigate(['add-medicine'])
//   }

//   markTaken(id:string){

//  const token =
//  localStorage.getItem('token');

//  const headers = new HttpHeaders({
//   Authorization:`Bearer ${token}`
//  });

//  this.http.post(
//  `http://localhost:5000/api/users/pill/${id}/taken`,
//  {},
//  {headers}
//  ).subscribe(()=>{

//    this.fetchPendingReminders();

//  });

// }

// markMissed(id:string){

//  const token =
//  localStorage.getItem('token');

//  const headers = new HttpHeaders({
//   Authorization:`Bearer ${token}`
//  });

//  this.http.post(
//  `http://localhost:5000/api/users/pill/${id}/missed`,
//  {},
//  {headers}
//  ).subscribe(()=>{

//    this.fetchPendingReminders();

//  });

// }

//   // The id is now the MongoDB _id
 

// }

// src/app/medicine-reminder/medicine-reminder.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PillsService } from '../pills.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-medicine-reminder',
  templateUrl: './medicine-reminder.component.html',
  styleUrls: ['./medicine-reminder.component.css']
})
export class MedicineReminderComponent implements OnInit {

  meds: any[] = [];
  pendingReminders: any[] = [];

  private baseUrl = 'http://localhost:5000/api/users';

  constructor(
    private router: Router,
    private pillsService: PillsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchPills();
    this.fetchPendingReminders();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToMedicineInfo(medId: any) {
    this.router.navigate(['medicine-info', medId]);
  }

  addPill() {
    this.router.navigate(['add-medicine']);
  }

  fetchPills(): void {
    this.pillsService.getPills().subscribe(
      (pills) => {
        this.meds = pills;
      },
      (error) => {
        console.error('Error fetching pills:', error);
      }
    );
  }

  fetchPendingReminders(): void {
    this.http
      .get<any[]>(`${this.baseUrl}/pending-reminders`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => {
          this.pendingReminders = data;
        },
        error: (err) => {
          console.error('Error fetching pending reminders:', err);
        }
      });
  }

  markTaken(id: string): void {
    this.http
      .post(`${this.baseUrl}/pill/${id}/taken`, {}, { headers: this.getHeaders() })
      .subscribe({
        next: () => {
          alert('✅ Medicine marked as taken!');
          this.fetchPendingReminders();
        },
        error: (err) => {
          console.error('Error marking taken:', err);
          alert('Something went wrong. Please try again.');
        }
      });
  }

  markMissed(id: string): void {
    this.http
      .post<any>(`${this.baseUrl}/pill/${id}/missed`, {}, { headers: this.getHeaders() })
      .subscribe({
        next: (res) => {
          alert('❌ Medicine marked as missed.');

          // Family alert notification in UI
          if (res.familyAlerted) {
            alert('⚠️ Alert sent to your family member as you have missed 3 or more medicines.');
          }

          this.fetchPendingReminders();
        },
        error: (err) => {
          console.error('Error marking missed:', err);
          alert('Something went wrong. Please try again.');
        }
      });
  }
}