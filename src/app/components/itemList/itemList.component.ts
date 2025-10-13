import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-itemList',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.component.css'],
})
export class ItemListComponent implements OnInit {
  itemStatus: number = 0;

  constructor(public itemService: ItemService, private router: Router) {
    itemService.getItems().subscribe((data) => {});
  }

  ngOnInit() {}

  addClick() {
    this.itemService.itemSelected = undefined;
    this.itemService.moveForward();
  }
}
