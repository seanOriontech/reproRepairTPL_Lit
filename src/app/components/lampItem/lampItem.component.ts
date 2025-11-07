import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { JobLampStatus } from 'src/app/enums/jobLampStatus.enum';
import { JobLamp } from 'src/app/models/jobLamp';
import { JobService } from 'src/app/services/job.service';
import { LampHeadpieceModalComponent } from '../modal/lampHeadpieceModal/lampHeadpieceModal.component';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-lampItem',
  templateUrl: './lampItem.component.html',
  styleUrls: ['./lampItem.component.css'],
})
export class LampItemComponent implements OnInit {
  @Input() lamp?: JobLamp = undefined;
  @Input() newLamp: boolean = false;
  isAlertOpen = false;

  JobLampStatus = JobLampStatus;

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
        this.removeItem();
      },
    },
  ];

  constructor(
    private toastController: ToastController,
    private jobService: JobService,
    private modalController: ModalController,
    private techService: TechService
  ) {}

  ngOnInit() {}

  async openSerialNumberModal() {
    this.jobService.selectedJobLamp = this.lamp ?? new JobLamp();

    const modal = await this.modalController.create({
      component: LampHeadpieceModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.accepted) {
        if (this.lamp) {
          let previosLap = JSON.parse(JSON.stringify(this.lamp));
          let checkLamp = JSON.parse(JSON.stringify(this.lamp));

          checkLamp.headPieceNumber = result.data.headPieceNumber ?? '';
          checkLamp.serialNumber = result.data.serialNumber ?? '';
          checkLamp.technicianID = result.data.technicianID ?? '';
          checkLamp.macAddress = result.data.macAddress ?? '';

          if (
            !this.checkLampHeadpiece(checkLamp.headPieceNumber ?? '') &&
            this.newLamp
          ) {
            this.lamp = previosLap;
            this.presentToast('Duplicate serial or headpiece', 'error');
            return;
          }

          this.lamp.headPieceNumber = result.data.headPieceNumber ?? '';
          this.lamp.serialNumber = result.data.serialNumber ?? '';
          this.lamp.technicianID = result.data.technicianID ?? '';
          this.lamp.macAddress = result.data.macAddress ?? '';

          if (!this.newLamp) {
            this.jobService.updateJobLampHead(this.lamp).subscribe(
              (x) => {},
              (err) => {
                this.lamp = previosLap;
                this.presentToast('Duplicate serial or headpiece', 'error');
              }
            );
          } else {
          }
        }

        console.log('Serial Number:', result.data.serialNumber);
      }
    });

    await modal.present();
  }

  getTechName(techID: string) {
    return this.techService.getTechnicianName(techID);
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

  editItemClick() {}

  removeItem() {
    if (this.newLamp) {
      let index = this.jobService.newLampItems.findIndex(
        (item) => item.serialNumber == this.lamp?.serialNumber
      );

      this.jobService.newLampItems.splice(index, 1);
    } else {
      this.jobService.removeJobLamp(this.lamp?.itemLampID).subscribe(
        (data) => {
          if (data == true) {
            this.presentToast('Lamp Removed', 'success');
          } else {
            this.presentToast('Lamp Removed', 'success');
          }
        },
        (error) => {
          this.presentToast('Error removing Lamp', 'error');
        }
      );
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
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
}
