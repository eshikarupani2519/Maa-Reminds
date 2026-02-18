import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MedicineReminderComponent } from './medicine-reminder/medicine-reminder.component';

import { MedicineInfoComponent } from './medicine-info/medicine-info.component';

import { MissedDosageComponent } from './missed-dosage/missed-dosage.component';
import { MedicineHistoryComponent } from './medicine-history/medicine-history.component';
import { MedicineStockComponent} from './medicine-stock/medicine-stock.component';






@NgModule({
  declarations: [
    AddMedicineComponent,
    MedicineReminderComponent,

    MedicineInfoComponent,

    MissedDosageComponent,
    MedicineHistoryComponent,
    MedicineStockComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MedicineModule { }
