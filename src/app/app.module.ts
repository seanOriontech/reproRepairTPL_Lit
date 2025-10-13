import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TechListComponent } from './components/techList/techList.component';
import { TechComponent } from './components/tech/tech.component';
import { TechFormComponent } from './components/techForm/techForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TechPageComponent } from './pages/techPage/techPage.component';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TechListComponent,
    TechComponent,
    TechFormComponent,
    TechPageComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
