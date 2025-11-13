import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UJobStatus } from 'src/app/enums/uJobStatus.enum';
import { Job } from 'src/app/models/job';
import { JobStatus } from 'src/app/models/jobStatus';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobProgress',
  templateUrl: './jobProgress.component.html',
  styleUrls: ['./jobProgress.component.css'],
})
export class JobProgressComponent implements OnInit {
  job: Job = new Job();

  jobStatuses = UJobStatus;

  jobStatusUpdate: UJobStatus = UJobStatus.None;

  header = 'Complete task ?';
  message = 'Are you sure you want to ?';

  isAlertOpen = false;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.jobService.newLampItems = [];
        this.isAlertOpen = false;
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.performUpdate();
        this.isAlertOpen = false;
      },
    },
  ];

  constructor(
    public jobService: JobService,
    private toastController: ToastController,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.jobService
      .getJobByID(this.jobService.jobSelected?.jobID ?? '')
      .subscribe(
        (job) => {
          this.job = job;

          if (this.job.jobStatus == UJobStatus.Created) {
            this.job.jobStatus = UJobStatus.Repairing;
          }
        },
        (err) => {}
      );
  }

  onClick(status: UJobStatus) {
    this.jobStatusUpdate = status;
    this.isAlertOpen = true;
    this.cdr.detectChanges();
  }

  getDisabled(status: UJobStatus) {
    this.job = this.jobService.jobSelected ?? new Job();
    if (this.job.jobStatus == status) {
      return false;
    } else {
      return true;
    }
  }

  performUpdate() {
    this.jobService.updateJobStatus(this.job, this.jobStatusUpdate).subscribe(
      (x) => {
        Object.assign(this.job, x);

        this.presentToast('Job status has been updated.', 'success');
        this.cdr.detectChanges();
      },
      (err) => {
        this.presentToast('There has been a error.', 'error');
      }
    );
  }

  backClick() {
    if (this.jobService.navNumber === 0) {
      this.router.navigate(['/jobsPage']);
    } else if (this.jobService.navNumber === 3) {
      this.jobService.navNumber = 0;
    } else {
      this.jobService.moveBackward();
    }
  }

  onRepairClick() {
    this.jobService.moveForward();
    this.cdr.detectChanges();
  }

  onQcClick() {
    this.jobService.navNumber = 3;
  }

  async presentToast(message: string, type: 'error' | 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      cssClass: type,
    });

    await toast.present();
  }
}
