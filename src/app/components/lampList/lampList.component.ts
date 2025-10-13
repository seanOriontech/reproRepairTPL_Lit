import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-lampList',
  templateUrl: './lampList.component.html',
  styleUrls: ['./lampList.component.css'],
})
export class LampListComponent implements OnInit {
  itemStatus: number = 0;

  constructor(public jobService: JobService, private router: Router) {}

  ngOnInit() {
    console.log(this.jobService.jobSelected);
  }

  addClick() {
    this.jobService.moveForward();
  }
}
