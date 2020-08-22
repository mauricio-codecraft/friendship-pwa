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
  pagination: URLSearchParams;
  showLoadMore: boolean;
  constructor(private router: Router) {}
  
  async ngOnInit() {
    this.showLoadMore = true;
    this.preorders = [];
    this.loadPreorders();
  }

  async loadPreorders() {
    if (this.pagination) {
      this.pagination.set('page', (+this.pagination.get('page') + 1).toString()); // next page  
    } else {
      this.pagination = new URLSearchParams({
        page: '0',
        size: '2',
        sort: 'created_at',
        order: 'desc'
      });
    }
    let morePreorders = await API.get('friendship', '/preorder/list?' + this.pagination.toString(), null);
    if (morePreorders && morePreorders.length > 0) {
      this.preorders = this.preorders.concat(morePreorders);
    } else {
      this.showLoadMore = false;
    }
  }
}
