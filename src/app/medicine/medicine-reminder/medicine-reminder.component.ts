// src/app/medicine-reminder/medicine-reminder.ts
import { Component, OnInit } from '@angular/core'; // <-- Import OnInit
import { Router } from '@angular/router';
import { PillsService } from '../pills.service'; // <-- Import the service

@Component({
  selector: 'app-medicine-reminder',
  templateUrl: './medicine-reminder.component.html',
  styleUrls: ['./medicine-reminder.component.css']
})
export class MedicineReminderComponent implements OnInit { // <-- Implement OnInit
  
  // meds is now initialized as an empty array
  meds: any[] = []; 

  constructor(private router:Router, private pillsService: PillsService){
  }

  
  // ADD THIS LIFECYCLE HOOK
  ngOnInit(): void {
    this.fetchPills();
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToMedicineInfo(medId:any){
    this.router.navigate(['medicine-info',medId]);

  }

  fetchPills(): void {
    this.pillsService.getPills().subscribe(
      (pills) => {
        // Assign the retrieved pills to the meds array
        this.meds = pills;
        console.log('Pills retrieved successfully:', this.meds);
      },
      (error) => {
        console.error('Error fetching pills:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }

  addPill(){
    this.router.navigate(['add-medicine'])
  }

  // The id is now the MongoDB _id
 

}