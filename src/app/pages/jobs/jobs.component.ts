import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  isAlertOpen = false;

  selectedSegment: string = 'CURRENT';

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.isAlertOpen = false;
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.tpl2Back();
      },
    },
  ];

  constructor(public jobService: JobService, private router: Router) {
    this.jobService.navNumber = 0;
  }

  ngOnInit() {}

  backClick() {
    if (this.jobService.newLampItems.length != 0) {
      this.isAlertOpen = true;
    } else {
      if (this.jobService.navNumber <= 0) {
        this.jobService.navNumber = 0;
        this.router.navigate(['mainPage']);
      }

      if (this.jobService.navNumber == 1) {
      }

      this.jobService.moveBackward();
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    console.log('Segment changed to: ', this.selectedSegment);
    // Add your logic here based on the selected segment
  }

  tpl2Back() {
    this.isAlertOpen = false;
    if (this.jobService.navNumber <= 0) {
      this.jobService.navNumber = 0;
      this.router.navigate(['mainPage']);
    }

    if (this.jobService.navNumber == 1) {
    }

    this.jobService.moveBackward();
  }
}
