import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
private apiUrl = 'http://localhost:5000/api/auth/register';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
}
loginUser(credentials: any): Observable<any> {
  return this.http.post("http://localhost:5000/api/auth/login", credentials);
}
forgotPassword(data: any): Observable<any> {
  return this.http.post("http://localhost:5000/api/auth/forgot-password", data);
}
findUserById(id:string){
  console.log("service pe toh aaya");
  return this.http.get(`http://localhost:5000/api/auth/user/${id}` );
}
}