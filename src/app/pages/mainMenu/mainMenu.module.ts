import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './mainMenu.component';
import { MainPageRoutingComponent } from './mainMenu.routing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VideoPlayerComponentComponent } from 'src/app/components/video/videoPlayerComponent/videoPlayerComponent.component';

@NgModule({
  imports: [CommonModule, MainPageRoutingComponent, FormsModule, IonicModule],
  declarations: [MainMenuComponent, VideoPlayerComponentComponent],
})
export class MainMenuModule {}
