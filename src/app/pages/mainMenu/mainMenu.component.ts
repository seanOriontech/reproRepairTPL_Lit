import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainMenu',
  templateUrl: './mainMenu.component.html',
  styleUrls: ['./mainMenu.component.css'],
})
export class MainMenuComponent implements OnInit {
  hlsStreamUrl = 'http://41.76.209.79:685/hls/stream.m3u8';

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Main Menu Component');
    // this.router.navigate(['itemPage']);
  }

  jobsClick() {
    this.router.navigate(['jobsPage']);
  }

  itemsClick() {
    this.router.navigate(['itemPage']);
  }

  techClick() {
    this.router.navigate(['technician']);
  }
}
