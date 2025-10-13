import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-videoPlayerComponent',
  templateUrl: './videoPlayerComponent.component.html',
  styleUrls: ['./videoPlayerComponent.component.css'],
})
export class VideoPlayerComponentComponent implements OnInit {
  @Input() videoUrl: string = '';
  @ViewChild('videoPlayer', { static: true }) videoPlayer:
    | ElementRef<HTMLVideoElement>
    | undefined;

  private hls: Hls | undefined;

  ngOnInit(): void {
    if (this.videoPlayer != undefined) {
      {
        if (Hls.isSupported()) {
          this.hls = new Hls();
          this.hls.loadSource(this.videoUrl);
          this.hls.attachMedia(this.videoPlayer.nativeElement);
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            this.videoPlayer?.nativeElement.play();
          });
        } else if (
          this.videoPlayer.nativeElement.canPlayType(
            'application/vnd.apple.mpegurl'
          )
        ) {
          this.videoPlayer.nativeElement.src = this.videoUrl;
          this.videoPlayer.nativeElement.addEventListener(
            'loadedmetadata',
            () => {
              this.videoPlayer?.nativeElement.play();
            }
          );
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.hls) {
      this.hls.destroy();
    }
  }
}
