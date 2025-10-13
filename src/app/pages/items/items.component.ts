import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  constructor(public itemService: ItemService, private router: Router) {
    this.itemService.navNumber = 0;
  }

  ngOnInit() {}

  backClick() {
    if (this.itemService.navNumber <= 0) {
      this.itemService.navNumber = 0;
      this.router.navigate(['mainPage']);
    }

    if (this.itemService.navNumber == 1) {
    }

    this.itemService.moveBackward();
  }
}
