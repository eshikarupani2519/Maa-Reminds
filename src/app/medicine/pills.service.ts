import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PillsService {

  private apiUrl = 'http://localhost:5000/api/users'; 

  constructor(private http: HttpClient) { }

  addPill(pillData: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    console.log('Retrieved token:', token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });

    return this.http.post(`${this.apiUrl}/add-pill`, pillData, { headers });
  }

  // 
  getPills(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/pills`, { headers });
  }
  deletePill(pillId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/pills/${pillId}`, { headers });
  }
  getPillById(pillId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/pills/${pillId}`, { headers });
  }
  updatePill(pillId: string, updatedPillData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(`${this.apiUrl}/pills/${pillId}`, updatedPillData, { headers });
  }
}
