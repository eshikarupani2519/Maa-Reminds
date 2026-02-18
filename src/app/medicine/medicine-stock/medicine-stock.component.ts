import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine-stock',
  templateUrl: './medicine-stock.component.html',
  styleUrls: ['./medicine-stock.component.css']
})
export class MedicineStockComponent implements OnInit {

  constructor(private router:Router){
    
  }
  startDate = new Date('2025-08-06');
  endDate = new Date('2025-09-06');
  totalMedicines = 20;

  calendar: { day: string; date: number; isFilled: boolean }[][] = [];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const temp: { day: string; date: number; isFilled: boolean }[] = [];

    const fullList: Date[] = [];
    let current = new Date(this.startDate.getTime());

    while (current <= this.endDate) {
      fullList.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const totalDays = fullList.length;
    const lastPillIndex = Math.max(0, totalDays - this.totalMedicines);

    fullList.forEach((dateObj, i) => {
      temp.push({
        day: dayNames[dateObj.getDay()],
        date: dateObj.getDate(),
        isFilled: i >= lastPillIndex // dark for remaining pills
      });
    });

    const columns: any[][] = [];
    for (let i = 0; i < temp.length; i += 7) {
      columns.push(temp.slice(i, i + 7));
    }

    this.calendar = columns;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
