import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item = new Item();

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
        this.removeItem();
      },
    },
  ];

  constructor(
    private itemService: ItemService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  editItemClick(item: Item) {
    this.itemService.itemSelected = item;

    this.itemService.moveForward();
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  removeItem() {
    this.itemService.deleteItem(this.item?.itemID ?? '').subscribe(
      (data) => {
        if (data != undefined) {
          this.presentToast('Error removing item.', 'error');
        } else {
          this.presentToast('Removed item.', 'success');
        }
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
}
