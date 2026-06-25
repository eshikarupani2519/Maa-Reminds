import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:any;name?:string;email?:string;age?:number;

  // id:string=(localStorage.getItem("user") || "");
  id: string = (localStorage.getItem("user") || "").replace(/"/g, "");

  
  constructor(private router: Router,private registerService:RegisterService) {

  }
  ngOnInit(){
    console.log(this.id);
    if(this.id)this.registerService.findUserById(this.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.user=res.user;
        console.log(this.user);
           this.name = this.user.fullName|| "none";        
  this.email= this.user.email || "none";
  this.age = this.user.age || "none";
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
   
 
  }
  

  

  feedbackName: string = '';
  feedback: string = '';
  rating: number = 0;

  setRating(star: number): void {
    this.rating = star;
  }

  submitFeedback(): void {
    const feedbackEntry = {
      name: this.feedbackName,
      feedback: this.feedback,
      rating: this.rating,
      time: new Date().toLocaleString()
    };

    const existing = JSON.parse(localStorage.getItem('turfFeedbacks') || '[]');
    existing.push(feedbackEntry);
    localStorage.setItem('turfFeedbacks', JSON.stringify(existing));

    alert(`Thank you, ${this.feedbackName}! Feedback saved ✅`);

    this.feedbackName = '';
    this.feedback = '';
    this.rating = 0;
  }

}
