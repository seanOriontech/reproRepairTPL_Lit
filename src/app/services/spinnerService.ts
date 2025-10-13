import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor() {}

  private scrollRequestSource = new BehaviorSubject<string>('');
  scrollRequest$ = this.scrollRequestSource.asObservable();

  private spinnerVisible = new BehaviorSubject<boolean>(false);

  showSpinner() {
    this.spinnerVisible.next(true);
  }

  hideSpinner() {
    this.spinnerVisible.next(false);
  }

  getSpinnerState() {
    return this.spinnerVisible.asObservable();
  }

  requestScrollToTop() {
    this.scrollRequestSource.next('');
  }
}
