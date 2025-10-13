import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Job } from 'src/app/models/job';
import { ItemService } from 'src/app/services/item.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobItem',
  templateUrl: './jobItem.component.html',
  styleUrls: ['./jobItem.component.css'],
})
export class JobItemComponent implements OnInit {
  @Input() job: Job = new Job();
  @Input() currentJob: number = 0;

  isAlertOpen = false;

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: (event: any) => {
        this.setOpen(event, false);
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.removeItem();
      },
    },
  ];

  constructor(
    private jobService: JobService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  editItemClick(event: Event, job: Job) {
    event.stopPropagation();
    this.jobService.jobSelected = job;

    this.jobService
      .getJobByID(this.jobService.jobSelected?.jobID ?? '')
      .subscribe(
        (x) => {
          this.jobService.moveForward();
        },
        (err) => {}
      );
  }

  setOpen(event: Event, isOpen: boolean) {
    event.stopPropagation();
    this.isAlertOpen = isOpen;
  }

  removeItem() {
    this.jobService.removeJob(this.job.jobID).subscribe(
      (data) => {
        if (data != undefined) {
          this.presentToast('Removed item.', 'success');
        } else {
          this.presentToast('Error removing item.', 'error');
        }
      },
      (err) => {
        this.presentToast('Error removing item.', 'error');
      }
    );
  }

  async presentToast(message: string, type: 'error' | 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: type,
    });

    await toast.present();
  }

  itemClick(event: Event) {
    this.jobService.jobSelected = this.job;
    this.router.navigate(['jobsPage/jobProgress']);
  }
}
