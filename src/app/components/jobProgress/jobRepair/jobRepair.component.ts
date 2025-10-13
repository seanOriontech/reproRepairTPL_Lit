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
  selector: 'app-jobRepair',
  templateUrl: './jobRepair.component.html',
  styleUrls: ['./jobRepair.component.css'],
})
export class JobRepairComponent implements OnInit {
  job: Job = new Job();

  searchTerm: string = '';

  filteredLamps = this.job.jobLamps;
  JobLampStatus = JobLampStatus;

  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;
  public barcodes: Barcode[] = [];

  isAlertOpen = false;

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
        this.clickComplete();
      },
    },
  ];

  constructor(
    private jobService: JobService,
    private toastController: ToastController,
    private techservice: TechService,
    private router: Router,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    if (this.jobService.jobSelected) {
      this.job = this.jobService.jobSelected;
    }

    this.filteredLamps = this.job.jobLamps?.sort((a, b) => {
      if (
        a.jobLampStatus === JobLampStatus.reparing &&
        b.jobLampStatus !== JobLampStatus.reparing
      ) {
        return -1; // a comes before b
      } else if (
        a.jobLampStatus !== JobLampStatus.reparing &&
        b.jobLampStatus === JobLampStatus.reparing
      ) {
        return 1; // b comes before a
      } else {
        return 0; // keep original order if both are same
      }
    });
  }

  getTech(techID: string) {
    return this.techservice.technicians.find((x) => x.technicianID == techID)
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
      // Set `visibility` to `ItemModalComponent` to show the modal (see `src/theme/variables.scss`)
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

      this.searchTerm = this.barcodes[0].displayValue;
    });
  }

  clickComplete() {
    this.jobService.updateJobStatus(this.job, UJobStatus.Repaired).subscribe(
      (result) => {
        this.job = result;
        this.jobService.jobSelected = result;
      },
      (err) => {}
    );
  }

  getActive() {
    let index = this.job.jobLamps?.findIndex(
      (x) => x.jobLampStatus == JobLampStatus.reparing
    );

    if (index == -1 && this.job.jobStatus != UJobStatus.Repairing) {
      return true;
    }

    return false;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
