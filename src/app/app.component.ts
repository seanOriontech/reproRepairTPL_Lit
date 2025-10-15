import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from './services/spinnerService';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  private observer?: MutationObserver;

  deferredPrompt: any;
  showInstallButton: boolean = false;

  spinnerVisible$ = this.spinnerService.getSpinnerState();

  constructor(
    router: Router,
    private spinnerService: SpinnerService,
    private swUpdate: SwUpdate
  ) {
    router.navigate(['mainPage']);

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          if (confirm('A new version is available. Do you want to update?')) {
            this.updateApp();
          }
        }
      });
    }
  }

  ngOnInit(): void {
    // Handle visibility changes******

    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // ⏱️ Check for update every 20 minutes
    if (this.swUpdate.isEnabled) {
      setInterval(() => {
        this.swUpdate
          .checkForUpdate()
          .then((hasUpdate) => {
            if (hasUpdate) {
              console.log('Update check triggered manually.');
            }
          })
          .catch((err) => {
            console.error('Error checking for service worker update:', err);
          });
      }, 20 * 60 * 1000); // 20 minutes
    }
  }

  private handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      console.log('PWA is now visible.');
      // Optionally: window.location.reload();
    } else {
      console.log('PWA is now hidden.');
    }
  };

  ngAfterViewInit(): void {}

  updateApp(): void {
    window.location.reload();
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.deferredPrompt = event;
    this.showInstallButton = true;
  }

  promptPWAInstallation() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log(
          choiceResult.outcome === 'accepted'
            ? 'User accepted the install prompt'
            : 'User dismissed the install prompt'
        );
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }
}
