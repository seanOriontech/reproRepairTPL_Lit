import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-itemForm',
  templateUrl: './itemForm.component.html',
  styleUrls: ['./itemForm.component.css'],
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;

  isToastOpen = false;

  constructor(
    private fb: FormBuilder,
    public itemService: ItemService,
    private toastController: ToastController
  ) {
    if (itemService.itemSelected == undefined) {
      this.itemForm = this.fb.group({
        name: ['', Validators.required],
        p_Code: ['', Validators.required],
        max: [0, [Validators.required, Validators.min(1)]],
        color: ['#FFFFFF', Validators.required],
      });
    } else {
      this.itemForm = this.fb.group({
        name: [this.itemService.itemSelected?.name, Validators.required],
        p_Code: [this.itemService.itemSelected?.p_Code, Validators.required],
        max: [
          this.itemService.itemSelected?.max,
          [Validators.required, Validators.min(1)],
        ],
        color: [this.itemService.itemSelected?.colour, Validators.required],
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

    if (this.itemService.itemSelected == undefined) {
      if (this.itemForm.valid) {
        const newItem: Item = {
          name: this.itemForm.value.name,
          p_Code: this.itemForm.value.p_Code,
          max: this.itemForm.value.max,
          colour: this.itemForm.value.color,
        };

        this.itemService.addItem(newItem).subscribe(
          (response) => {
            if (response == undefined) {
              this.presentToast('Error adding item.', 'error');
            } else {
              this.presentToast('Added item.', 'success');
              this.itemForm.reset();
              this.itemService.moveBackward();
            }
          },
          (err) => {
            this.presentToast('Error adding item.', 'error');
          }
        );
      }
    } else {
      if (this.itemForm.valid) {
        const newItem: Item = {
          itemID: this.itemService.itemSelected.itemID,
          name: this.itemForm.value.name,
          p_Code: this.itemForm.value.p_Code,
          max: this.itemForm.value.max,
          colour: this.itemForm.value.color,
        };

        this.itemService.updateItem(newItem).subscribe(
          (response) => {
            if (response == undefined) {
              this.presentToast('Error updating item.', 'error');
            } else {
              this.presentToast('Updated item.', 'success');
              this.itemForm.reset();
              this.itemService.moveBackward();
            }
          },
          (err) => {
            this.presentToast('Error updating item.', 'error');
          }
        );
      }
    }
  }
}
