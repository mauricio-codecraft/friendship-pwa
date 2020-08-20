import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.scss'],
})
export class UserPage implements OnInit {
  constructor(private router: Router) {}
  
  ngOnInit() {
    
  }
}
