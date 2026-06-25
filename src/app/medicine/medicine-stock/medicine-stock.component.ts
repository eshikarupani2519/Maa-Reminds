import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-medicine-stock',
  templateUrl: './medicine-stock.component.html',
  styleUrls: ['./medicine-stock.component.css']
})
export class MedicineStockComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // all medicines from backend
  medicineCalendars: any[] = [];

  ngOnInit() {
    this.getMedicines();
  }

  // =========================
  // GET ALL USER PILLS
  // =========================
  getMedicines() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:5000/api/users/pills', { headers })
      .subscribe({
        next: (res) => {
          this.prepareCalendars(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  // =========================
  // CREATE ONE CALENDAR FOR EACH MEDICINE
  // =========================
  prepareCalendars(pills: any[]) {

    this.medicineCalendars = [];

    pills.forEach((pill) => {

      const startDate = new Date(pill.startDate);
      const endDate = new Date(pill.endDate);
      const totalMedicines = Number(pill.quantityYouHave);

      const calendar = this.generateCalendar(
        startDate,
        endDate,
        totalMedicines
      );

      this.medicineCalendars.push({
        pillName: pill.pillName,
        calendar: calendar
      });

    });
  }

  // =========================
  // YOUR SAME LOGIC
  // =========================
  generateCalendar(
    startDate: Date,
    endDate: Date,
    totalMedicines: number
  ) {

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const temp: any[] = [];
    const fullList: Date[] = [];

    let current = new Date(startDate.getTime());

    while (current <= endDate) {
      fullList.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const totalDays = fullList.length;

    const lastPillIndex = Math.max(
      0,
      totalDays - totalMedicines
    );

    fullList.forEach((dateObj, i) => {

      temp.push({
        day: dayNames[dateObj.getDay()],
        date: dateObj.getDate(),
        isFilled: i >= lastPillIndex
      });

    });

    const columns: any[][] = [];

    for (let i = 0; i < temp.length; i += 7) {
      columns.push(temp.slice(i, i + 7));
    }

    return columns;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}