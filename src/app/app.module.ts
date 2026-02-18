// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { AuthModule } from './auth/auth.module';
// import { FormsModule } from '@angular/forms';
// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     // AppRoutingModule,
//     AuthModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // ✅ Added ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';
import { MedicineModule } from './medicine/medicine.module';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { AppointmentReminderComponent } from './appointment/appointment-reminder/appointment-reminder.component';
import { AppointmentHistoryComponent } from './appointment/appointment-history/appointment-history.component';
import { AppointmentModule } from './appointment/appointment.module';

@NgModule({
  declarations: [
    AppComponent,
    AddAppointmentComponent,
    AppointmentReminderComponent,
    AppointmentHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,       // ✅ Required for API calls
    ReactiveFormsModule,    // ✅ Required for FormGroup, FormControl
    FormsModule    ,
    MedicineModule ,
    PublicModule,
    AppointmentModule,
    FormsModule      // ✅ If using ngModel anywhere
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
