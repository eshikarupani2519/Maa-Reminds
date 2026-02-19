import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ForgotPWComponent } from './auth/forgot-pw/forgot-pw.component';
import { HomeComponent } from './public/home/home.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { MedicineReminderComponent } from './medicine/medicine-reminder/medicine-reminder.component';
import { AddMedicineComponent } from './medicine/add-medicine/add-medicine.component';

import { MedicineInfoComponent } from './medicine/medicine-info/medicine-info.component';

import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { AppointmentReminderComponent } from './appointment/appointment-reminder/appointment-reminder.component';
import { AppointmentHistoryComponent } from './appointment/appointment-history/appointment-history.component';
import { MedicineHistoryComponent } from './medicine/medicine-history/medicine-history.component';
import { MedicineStockComponent } from './medicine/medicine-stock/medicine-stock.component';
import { MissedDosageComponent } from './medicine/missed-dosage/missed-dosage.component';
import { AppointmentInfoComponent } from './appointment/appointment-info/appointment-info.component';



const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

{path:'profile',component:ProfileComponent},
  {path:'forgotPW/:token',component:ForgotPWComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'medicine-reminder',component:MedicineReminderComponent},


  {path:'add-medicine',component:AddMedicineComponent}
,{ path: 'appointment-info/:id', component: AppointmentInfoComponent }





  ,{path:'medicine-info/:id',component:MedicineInfoComponent},


  {path:'add-appointment',component:AddAppointmentComponent},
  {path:'appointment-reminder',component:AppointmentReminderComponent},
  {path:'appointment-history',component:AppointmentHistoryComponent},
  {path:'medicine-history',component:MedicineHistoryComponent},
  {path:'medicine-stock',component:MedicineStockComponent},
  {path:'missed-dosage',component:MissedDosageComponent}
,{path:'add-medicine/:id',component:AddMedicineComponent},
{ path: 'add-appointment/:id', component: AddAppointmentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
