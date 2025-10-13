import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-jobForm',
  templateUrl: './jobForm.component.html',
  styleUrls: ['./jobForm.component.css'],
})
export class JobFormComponent implements OnInit {
  itemForm: FormGroup;

  isToastOpen = false;

  selectedSegment: string = 'general';

  constructor(
    private fb: FormBuilder,
    public jobService: JobService,
    private toastController: ToastController,
    public techService: TechService
  ) {
    if (jobService.jobSelected == undefined) {
      this.itemForm = this.fb.group({
        rsNumber: ['', Validators.required],
        rfq: ['', Validators.required],
        mineId: ['', Validators.required],
        technicianID: ['', Validators.required],
        isRepair: [false, Validators.required],
        isUpgrade: [false, Validators.required],
        is12Volt: [false, Validators.required],
      });
    } else {
      this.itemForm = this.fb.group({
        rsNumber: [jobService.jobSelected.rsNumber, Validators.required],
        rfq: [jobService.jobSelected.rfq, Validators.required],
        mineId: [jobService.jobSelected.mineId, Validators.required],
        isRepair: [jobService.jobSelected.isRepair, Validators.required],
        isUpgrade: [jobService.jobSelected.isUpgrade, Validators.required],
        is12Volt: [jobService.jobSelected.is12Volt, Validators.required],
        technicianID: [
          jobService.jobSelected.technicianID,
          Validators.required,
        ],
      });
    }
  }

  ngOnInit() {
    this.techService.getItems().subscribe();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  onSubmit(event: any) {
    event.preventDefault();
    if (this.jobService.jobSelected == undefined) {
      if (this.itemForm.valid) {
        const newJob: Job = {
          rsNumber: this.itemForm.value.rsNumber,
          rfq: this.itemForm.value.rfq,
          mineId: this.itemForm.value.mineId,
          isRepair: this.itemForm.value.isRepair,
          isUpgrade: this.itemForm.value.isUpgrade,
          is12Volt: this.itemForm.value.is12Volt,
          technicianID: this.itemForm.value.technicianID,
        };

        this.jobService.addJob(newJob).subscribe(
          (response) => {
            if (response == undefined) {
              this.presentToast('Error adding job.', 'error');
            } else {
              this.presentToast('Added job.', 'success');
              this.itemForm.reset();
              this.jobService.moveBackward();
            }
          },
          (err) => {
            this.presentToast('Duplicate JOB Number!!.', 'error');
          }
        );
      }
    } else {
      if (this.itemForm.valid) {
        console.log(this.jobService.jobSelected);
        const newJob: Job = {
          jobID: this.jobService.jobSelected.jobID,
          rsNumber: this.itemForm.value.rsNumber,
          rfq: this.itemForm.value.rfq,
          mineId: this.itemForm.value.mineId,
          isRepair: this.itemForm.value.isRepair,
          isUpgrade: this.itemForm.value.isUpgrade,
          is12Volt: this.itemForm.value.is12Volt,
          technicianID: this.itemForm.value.technicianID,
        };

        this.jobService.updateJob(newJob).subscribe(
          (response) => {
            if (response == undefined) {
              this.presentToast('Error updating item.', 'error');
            } else {
              this.presentToast('Updated item.', 'success');
              this.itemForm.reset();
              this.jobService.moveBackward();
            }
          },
          (err) => {
            this.presentToast('Error updating item.', 'error');
          }
        );
      }
    }
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
