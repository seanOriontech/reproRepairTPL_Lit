import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-techPage',
  templateUrl: './techPage.component.html',
  styleUrls: ['./techPage.component.css'],
})
export class TechPageComponent implements OnInit {
  constructor(public techService: TechService, private router: Router) {}

  ngOnInit() {}

  backClick() {
    if (this.techService.navNumber <= 0) {
      this.techService.navNumber = 0;
      this.router.navigate(['mainPage']);
    }

    if (this.techService.navNumber == 1) {
    }

    this.techService.moveBackward();
  }
}
