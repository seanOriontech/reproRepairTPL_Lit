import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from './services/spinnerService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  spinnerVisible$ = this.spinnerService.getSpinnerState();

  constructor(router: Router, private spinnerService: SpinnerService) {
    router.navigate(['mainPage']);
  }
}
