import { Component, OnInit } from '@angular/core';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-techList',
  templateUrl: './techList.component.html',
  styleUrls: ['./techList.component.css'],
})
export class TechListComponent implements OnInit {
  constructor(public techService: TechService) {}

  ngOnInit() {
    this.techService.getItems().subscribe(
      (data) => {},
      (err) => {}
    );
  }

  addClick() {
    this.techService.techSelected = undefined;
    this.techService.moveForward();
  }
}
