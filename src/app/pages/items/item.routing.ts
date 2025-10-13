import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items.component';
import { ItemListComponent } from 'src/app/components/itemList/itemList.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
  },
  {
    path: 'itemList',
    component: ItemListComponent,
  },
  {
    path: 'itemForm',
    component: ItemListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingComponent {}
