import { Component, OnInit } from '@angular/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { DialogService } from 'src/app/services/dialog.service';
import { ItemModalComponent } from '../itemBarcode/itemModal/itemModal.component';
import { JobLamp } from 'src/app/models/jobLamp';
import { JobService } from 'src/app/services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lampAdd',
  templateUrl: './lampAdd.component.html',
  styleUrls: ['./lampAdd.component.css'],
})
export class LampAddComponent implements OnInit {
  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;
  public barcodes: Barcode[] = [];

  public jobLamps: JobLamp[] = [];

  itemForm: FormGroup;

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
        this.addLamps();
      },
    },
  ];

  constructor(
    private readonly dialogService: DialogService,
    public jobService: JobService,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    this.itemForm = this.fb.group({
      serialNumber: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.jobService.newLampItems = [];

    /* for (let i = 0; i < 100; i++) {
      let newLamp = new JobLamp();
      newLamp.serialNumber = i.toString();
      this.jobService.newLampItems.push(newLamp);
    }*/
  }

  async addClick() {
    await this.startScan();
  }

  addToJob() {
    this.isAlertOpen = true;
  }

  async addManualClick() {
    if (this.itemForm.valid) {
      let newLamp = new JobLamp();

      newLamp.serialNumber = this.itemForm.get('serialNumber')?.value;

      if (
        this.checkLamps(newLamp.serialNumber ?? '') &&
        this.checkLampHeadpiece(newLamp.headPieceNumber ?? '')
      ) {
        this.jobService.newLampItems.push(newLamp);

        this.itemForm.controls['serialNumber']?.setValue('');

        this.presentToast('TPL2 added.', 'success');
      } else {
        this.presentToast('Duplicate Serial Number.', 'error');
      }
    }
  }

  public async startScan(): Promise<void> {
    const element = await this.dialogService.showModal({
      component: ItemModalComponent,
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

      this.getLamps();

      if (barcode) {
        this.barcodes = [barcode];
        console.log(barcode);
      }
    });
  }

  checkLamps(serial: string): boolean {
    let lampsAdded = this.jobService.jobSelected?.jobLamps?.findIndex(
      (x) => x.serialNumber == serial
    );
    let lampsNewAdded = this.jobService.newLampItems.findIndex(
      (x) => x.serialNumber == serial
    );

    if (lampsAdded == -1 && lampsNewAdded == -1) {
      return true;
    } else {
      return false;
    }
  }

  checkLampHeadpiece(headPiece: string): boolean {
    if (headPiece != '') {
      let lampsAdded = this.jobService.jobSelected?.jobLamps?.findIndex(
        (x) => x.headPieceNumber == headPiece
      );
      let lampsNewAdded = this.jobService.newLampItems.findIndex(
        (x) => x.headPieceNumber == headPiece
      );

      console.log(lampsAdded);
      console.log(lampsNewAdded);
      console.log(headPiece);

      if (lampsAdded == -1 && lampsNewAdded == -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  public async getLamps() {
    this.barcodes.forEach((barcode) => {
      if (this.checkLamps(barcode.displayValue)) {
        let newLamp = new JobLamp();
        newLamp.serialNumber = barcode.displayValue;

        this.jobService.newLampItems.push(newLamp);
      }
    });
  }

  public async addLamps() {
    this.jobService
      .addJobLamps(
        this.jobService.jobSelected?.jobID,
        this.jobService.newLampItems
      )
      .subscribe(
        (lamps) => {
          console.log(lamps);
          this.presentToast('Lamps added successfully', 'success');
          this.jobService.newLampItems = [];
          this.jobService.moveBackward();
        },
        (error) => {
          this.presentToast('Error adding lamps', 'error');
        }
      );
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
