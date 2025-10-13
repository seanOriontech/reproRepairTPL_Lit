import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingComponent } from './login.routing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, LoginRoutingComponent, FormsModule, IonicModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
