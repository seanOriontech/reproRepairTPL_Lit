import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JobService } from 'src/app/services/job.service';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-lampHeadpieceModal',
  templateUrl: './lampHeadpieceModal.component.html',
  styleUrls: ['./lampHeadpieceModal.component.css'],
})
export class LampHeadpieceModalComponent {
  headPieceNumber: string = '';
  serialNumber: string = '';
  technicianID: string = '';
  macAddress: string = '';
  showTechError = false;

  constructor(
    private modalController: ModalController,
    private jobService: JobService,
    public techService: TechService
  ) {
    this.headPieceNumber =
      this.jobService.selectedJobLamp.headPieceNumber ?? '';
    this.serialNumber = this.jobService.selectedJobLamp.serialNumber ?? '';
    this.macAddress = this.jobService.selectedJobLamp.macAddress ?? '';
    this.technicianID = this.jobService.selectedJobLamp.technicianID ?? '';
  }

  accept() {
    // ✅ Require technician selection
    if (!this.technicianID || this.technicianID.trim() === '') {
      this.showTechError = true;
      return;
    }

    this.showTechError = false; // hide error if valid
    this.modalController.dismiss({
      accepted: true,
      serialNumber: this.serialNumber,
      headPieceNumber: this.headPieceNumber,
      technicianID: this.technicianID,
      macAddress: this.macAddress,
    });
  }

  dismiss() {
    this.modalController.dismiss({ accepted: false });
  }
}
