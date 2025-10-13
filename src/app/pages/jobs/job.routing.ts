import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { NgModule } from '@angular/core';
import { JobProgressComponent } from 'src/app/components/jobProgress/jobProgress.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
  },
  {
    path: 'jobProgress',
    component: JobProgressComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingComponent {}
