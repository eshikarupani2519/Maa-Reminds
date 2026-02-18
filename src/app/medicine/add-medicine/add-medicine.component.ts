import { Component, OnInit } from '@angular/core'; // <-- ADDED OnInit
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PillsService } from '../pills.service';
import { Router, ActivatedRoute } from '@angular/router'; // <-- ADDED ActivatedRoute

// Define an interface for the form value to ensure type safety
interface AddPillFormValue {
  pillName: string | null; // <-- Corrected property name to match formControlName
  startDate: string | null;
  endDate: string | null;
  frequency: string | null;
  timing: string | null;
  beforeAfterMeal: string | null;
  quantityYouHave: string | null;
  description: string | null;
}

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit { // <-- IMPLEMENTED OnInit
  pillId: string | null = null;
  formTitle: string = 'Add a Pill';
  buttonText: string = 'Add';

  constructor(
    private pillService: PillsService,
    private router: Router,
    private activatedRoute: ActivatedRoute // <-- ADDED ActivatedRoute
  ) {}

  addPill = new FormGroup({
    pillName: new FormControl<string | null>('', [Validators.required]),
    startDate: new FormControl<string | null>('', [Validators.required]),
    endDate: new FormControl<string | null>('', [Validators.required]),
    frequency: new FormControl<string | null>('', [Validators.required]),
    timing: new FormControl<string | null>('', [Validators.required]),
    beforeAfterMeal: new FormControl<string | null>('', [Validators.required]),
    quantityYouHave: new FormControl<string | null>('', [Validators.required]),
    description: new FormControl<string | null>('')
  });
  
  // NEW: Logic to check for an ID and populate the form
  ngOnInit(): void {
    this.pillId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.pillId) {
      this.formTitle = 'Edit Pill';
      this.buttonText = 'Save Changes';

      this.pillService.getPillById(this.pillId).subscribe({
        next: (pillData) => {
          this.addPill.patchValue(pillData);
        },
        error: (err) => {
          console.error('Error fetching pill for edit:', err);
          alert('Could not load pill data.');
          this.router.navigate(['/medicine-reminders']);
        }
      });
    }
  }

  getFormControl(name: string): FormControl | null {
    return this.addPill.get(name) as FormControl;
  }

  isFormControlError(name: string): boolean {
    const control = this.getFormControl(name);
    return !!(control?.errors?.['required'] && control?.dirty);
  }

  // DELETED: Removed the irrelevant checkPassword method.

  // UPDATED: The onSubmit method now handles both add and update
  onSubmit(): void {
    if (this.addPill.valid) {
      if (this.pillId) {
        // Update Logic
        this.pillService.updatePill(this.pillId, this.addPill.value).subscribe({
          next: (response:any) => {
            console.log('Pill updated successfully', response);
            this.router.navigate(['/medicine-reminder']);
          },
          error: (error:any) => {
            console.error('Error updating pill', error);
          }
        });
      } else {
        // Add Logic
        this.pillService.addPill(this.addPill.value as AddPillFormValue).subscribe({
          next: (response) => {
            console.log('Pill added successfully', response);
            this.router.navigate(['/medicine-reminders']);
          },
          error: (error) => {
            console.error('Error adding pill', error);
          }
        });
      }
    }
  }
}