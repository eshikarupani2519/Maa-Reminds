// src/app/medicine-info/medicine-info.ts
import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { PillsService } from '../pills.service';

@Component({
  selector: 'app-medicine-info',
  templateUrl: './medicine-info.component.html',
  styleUrls: ['./medicine-info.component.css']
})
export class MedicineInfoComponent implements OnInit { 
  id: string | null = null;
  medicine: any = null; // Stays null until data is loaded

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private pillsService: PillsService 
  ) {}

  ngOnInit(): void {
    // Get the pill ID from the URL parameters
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // Fetch the medicine data using the new service method
    if (this.id) { // Ensure the ID exists before making the call
      this.pillsService.getPillById(this.id).subscribe({
        next: (pill) => {
          this.medicine = pill; // This line populates the medicine object
          console.log('Pill data loaded:', this.medicine);
        },
        error: (error) => {
          console.error('Error fetching pill data:', error);
          // Handle error, e.g., show an error message
        }
      });
    }
  }

  editMedicine(id: any) {
    console.log('Edit clicked for ID:', id);
    // ADDED: The routing logic to navigate to the add-medicine component with the pill's ID
    this.router.navigate(['add-medicine',id]); 
  }

  deleteMedicine(id: any) {
    console.log('Delete clicked for ID:', id);
    if (confirm('Are you sure you want to delete this medicine?')) {
      this.pillsService.deletePill(id).subscribe({
        next: (response) => {
          console.log('Pill deleted successfully:', response);
          alert('Pill deleted successfully!');
          this.router.navigate(['medicine-reminder']);
        }
        // error: (error) => {
        //   console.error('Error deleting pill:', error);
        //   alert('Failed to delete pill.');
        // }
      });
    }
  }
}