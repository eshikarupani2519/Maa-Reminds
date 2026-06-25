// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { MedicineStockComponent } from './medicine-stock.component';

// describe('MedicineStockComponent', () => {
//   let component: MedicineStockComponent;
//   let fixture: ComponentFixture<MedicineStockComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [MedicineStockComponent]
//     });
//     fixture = TestBed.createComponent(MedicineStockComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
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

  medicineCalendars: any[] = [];

  ngOnInit(): void {
    this.getMedicines();
  }

  // ==========================
  // FETCH PILLS FROM BACKEND
  // ==========================
  getMedicines() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:5000/api/pills', { headers })
      .subscribe({
        next: (res) => {
          this.prepareData(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  // ==========================
  // CREATE UI FOR EVERY MEDICINE
  // ==========================
  prepareData(pills: any[]) {

    this.medicineCalendars = [];

    pills.forEach((pill) => {

      const startDate = new Date(pill.startDate);
      const endDate   = new Date(pill.endDate);

      const stock = Number(pill.quantityYouHave);

      const calendar = this.generateCalendar(
        startDate,
        endDate,
        stock
      );

      this.medicineCalendars.push({
        pillName: pill.pillName,
        frequency: pill.frequency,
        timing: pill.timing,
        beforeAfterMeal: pill.beforeAfterMeal,
        stock: stock,
        calendar: calendar
      });

    });
  }

  // ==========================
  // MAIN LOGIC
  // DARK = stock available
  // LIGHT = reorder needed
  // ==========================
  generateCalendar(
    startDate: Date,
    endDate: Date,
    stock: number
  ) {

    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    const temp: any[] = [];
    const dates: Date[] = [];

    let current = new Date(startDate);

    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const totalDays = dates.length;

    // Last available stock dark
    const darkStart = Math.max(0, totalDays - stock);

    dates.forEach((dateObj, i) => {

      temp.push({
        day: dayNames[dateObj.getDay()],
        date: dateObj.getDate(),
        isFilled: i >= darkStart
      });

    });

    const columns = [];

    for (let i = 0; i < temp.length; i += 7) {
      columns.push(temp.slice(i, i + 7));
    }

    return columns;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}