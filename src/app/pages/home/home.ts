import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {
  preorders: any;
  constructor(private router: Router) {}
  
  async ngOnInit() {
    this.preorders = await API.get('friendship', '/preorder/list', null);
    //console.log('this.preorders = ', this.preorders);
  }
}
