import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { ItemRoutingComponent } from './item.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemFormComponent } from 'src/app/components/itemForm/itemForm.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { ItemListComponent } from 'src/app/components/itemList/itemList.component';
import { ItemBarcodeComponent } from 'src/app/components/itemBarcode/itemBarcode.component';
import { ItemModalComponent } from 'src/app/components/itemBarcode/itemModal/itemModal.component';

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingComponent,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ItemsComponent,
    ItemFormComponent,
    ItemComponent,
    ItemListComponent,
    ItemBarcodeComponent,
    ItemModalComponent,
  ],
})
export class ItemsModule {}
