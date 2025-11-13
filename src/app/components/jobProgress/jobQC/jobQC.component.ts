import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { ItemModelSingleComponent } from '../../itemBarcode/itemModelSingle/itemModelSingle.component';
import {
  Barcode,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { DialogService } from 'src/app/services/dialog.service';
import { JobLamp } from 'src/app/models/jobLamp';
import { JobLampStatus } from 'src/app/enums/jobLampStatus.enum';
import { UJobStatus } from 'src/app/enums/uJobStatus.enum';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-qc',
  templateUrl: './jobQC.component.html',
  styleUrls: ['./jobQC.component.css'],
})
export class JobQCComponent implements OnInit {
  job: Job = new Job();

  searchTerm: string = '';
  filteredLamps = this.job.jobLamps;
  JobLampStatus = JobLampStatus;

  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;
  public barcodes: Barcode[] = [];

  isAlertOpen = false;
  isSaving = false;  // spinner ke liye flag


  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.setOpen(false);
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.clickCompleteQC();
      },
    },
  ];

  constructor(
    private jobService: JobService,
    private toastController: ToastController,
    public techService: TechService,
    private router: Router,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    if (this.jobService.jobSelected) {
      this.job = this.jobService.jobSelected;
    }

    // Sort lamps (reparing first)
    this.filteredLamps = this.job.jobLamps?.sort((a, b) => {
      if (
        a.jobLampStatus === JobLampStatus.reparing &&
        b.jobLampStatus !== JobLampStatus.reparing
      ) {
        return -1;
      } else if (
        a.jobLampStatus !== JobLampStatus.reparing &&
        b.jobLampStatus === JobLampStatus.reparing
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getTech(techID: string) {
    return this.techService.technicians.find((x) => x.technicianID == techID)
      ?.name;
  }

  filterLamps() {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (this.job.jobLamps) {
      this.filteredLamps = this.job.jobLamps.filter(
        (lamp) =>
          lamp.serialNumber != undefined &&
          lamp?.serialNumber.toLowerCase().includes(searchTermLower)
      );
    }
  }

  async onScanClick() {
    await this.startScan();
  }

  lampClick(lamp: JobLamp) {
    this.jobService.selectedJobLamp = lamp;
    this.jobService.moveForward();
  }

  public async startScan(): Promise<void> {
    const element = await this.dialogService.showModal({
      component: ItemModelSingleComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [this.barcodeFormat.Code128],
        lensFacing: LensFacing.Back,
      },
    });

    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      this.barcodes = result.data?.barcodes;

      if (barcode) {
        this.barcodes = [barcode];
        console.log(barcode);
      }

      this.searchTerm = this.barcodes[0]?.displayValue ?? '';
    });
  }

  // ✅ Updated for QC completion
  clickCompleteQC() {
    this.jobService.updateJobStatus(this.job, UJobStatus.QCChecked).subscribe(
      (result) => {
        this.job = result;
        this.jobService.jobSelected = result;
        this.presentToast('QC process completed successfully.', 'success');
      },
      (err) => {
        this.presentToast('Error while completing QC.', 'error');
      }
    );
  }

  getActive() {
    let index = this.job.jobLamps?.findIndex(
      (x) => x.jobLampStatus == JobLampStatus.reparing
    );

    if (index == -1 && this.job.jobStatus != UJobStatus.QCChecked) {
      return true;
    }

    return false;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
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

  isModalOpen = false;
  selectedLamp: JobLamp | null = null;

  openPopup(lamp: JobLamp) {
    this.selectedLamp = { ...lamp };
    this.isModalOpen = true;
  }

  closePopup() {
    this.isModalOpen = false;
    this.selectedLamp = null;
  }

async saveLampDetails() {
  if (!this.selectedLamp?.technicianID) {
    this.presentToast('Please select a technician first.', 'error');
    return;
  }

  this.isSaving = true;

  // Update only technicianQAID
  this.job.technicianQAID = this.selectedLamp.technicianID;

  this.jobService.updateJob(this.job).subscribe(
    async (res) => {
      this.isSaving = false;
      this.presentToast('Technician assigned successfully.', 'success');
      this.closePopup();
    },
    async (err) => {
      this.isSaving = false;
      console.error(err);
      this.presentToast('Failed to assign technician.', 'error');
    }
  );
}


}
