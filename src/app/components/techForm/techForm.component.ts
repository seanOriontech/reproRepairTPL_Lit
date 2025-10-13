import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Technician } from 'src/app/models/technician';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-techForm',
  templateUrl: './techForm.component.html',
  styleUrls: ['./techForm.component.css'],
})
export class TechFormComponent implements OnInit {
  itemForm: FormGroup;

  isToastOpen = false;

  constructor(
    private fb: FormBuilder,
    public techService: TechService,
    private toastController: ToastController
  ) {
    if (techService.techSelected == undefined) {
      this.itemForm = this.fb.group({
        name: ['', Validators.required],
      });
    } else {
      this.itemForm = this.fb.group({
        name: [this.techService.techSelected?.name, Validators.required],
      });
    }
  }

  ngOnInit() {}

  async presentToast(message: string, type: 'error' | 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      cssClass: type,
    });

    await toast.present();
  }

  onSubmit(event: any) {
    event.preventDefault();

    if (this.techService.techSelected == undefined) {
      if (this.itemForm.valid) {
        const newItem: Technician = {
          name: this.itemForm.value.name,
        };

        this.techService.addItem(newItem).subscribe(
          (response) => {
            if (response == undefined) {
              this.presentToast('Error adding technician.', 'error');
            } else {
              this.presentToast('Added technician.', 'success');
              this.itemForm.reset();
              this.techService.moveBackward();
            }
          },
          (err) => {
            this.presentToast('Error adding technician.', 'error');
          }
        );
      }
    } else {
      if (this.itemForm.valid) {
        const newItem: Technician = {
          technicianID: this.techService.techSelected.technicianID,
          name: this.itemForm.value.name,
        };

        this.techService.updateItem(newItem).subscribe(
          (response) => {
            if (response == undefined) {
              this.presentToast('Error updating technician.', 'error');
            } else {
              this.presentToast('Updated technician.', 'success');
              this.itemForm.reset();
              this.techService.moveBackward();
            }
          },
          (err) => {
            this.presentToast('Error updating technician.', 'error');
          }
        );
      }
    }
  }
}
