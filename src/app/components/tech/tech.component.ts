import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Technician } from 'src/app/models/technician';
import { JobService } from 'src/app/services/job.service';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.css'],
})
export class TechComponent implements OnInit {
  @Input() tech: Technician = new Technician();
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
    private techService: TechService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  editItemClick(event: Event, tech: Technician) {
    event.stopPropagation();
    this.techService.techSelected = tech;

    this.techService.moveForward();
  }

  setOpen(event: Event, isOpen: boolean) {
    event.stopPropagation();
    this.isAlertOpen = isOpen;
  }

  removeItem() {
    this.techService.deleteItem(this.tech.technicianID ?? '').subscribe(
      (data) => {
        this.presentToast('Removed item.', 'success');
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
    /*  this.jobService.jobSelected = this.job;
    this.router.navigate(['jobsPage/jobProgress']);*/
  }
}
