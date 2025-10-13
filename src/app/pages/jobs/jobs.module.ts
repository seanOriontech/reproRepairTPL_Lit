import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { JobsRoutingComponent } from './job.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JobListComponent } from 'src/app/components/jobList/jobList.component';
import { JobItemComponent } from 'src/app/components/jobItem/jobItem.component';
import { JobFormComponent } from 'src/app/components/jobForm/jobForm.component';
import { ReadableDatePipe } from 'src/app/pipe/readableDatePipe.pipe';
import { LampListComponent } from 'src/app/components/lampList/lampList.component';
import { LampItemComponent } from 'src/app/components/lampItem/lampItem.component';
import { LampAddComponent } from 'src/app/components/lampAdd/lampAdd.component';
import { JobProgressComponent } from 'src/app/components/jobProgress/jobProgress.component';
import { JobRepairComponent } from 'src/app/components/jobProgress/jobRepair/jobRepair.component';
import { ItemModelSingleComponent } from 'src/app/components/itemBarcode/itemModelSingle/itemModelSingle.component';
import { JobRepairItemsComponent } from 'src/app/components/jobProgress/jobRepairItems/jobRepairItems.component';
import { TechListComponent } from 'src/app/components/techList/techList.component';
import { ItemModalComponent } from 'src/app/components/itemBarcode/itemModal/itemModal.component';
import { LampHeadpieceModalComponent } from 'src/app/components/modal/lampHeadpieceModal/lampHeadpieceModal.component';

@NgModule({
  imports: [
    CommonModule,
    JobsRoutingComponent,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [
    JobsComponent,
    JobListComponent,
    JobItemComponent,
    JobFormComponent,
    LampListComponent,
    LampItemComponent,
    LampAddComponent,
    ReadableDatePipe,
    JobProgressComponent,
    JobRepairComponent,
    ItemModelSingleComponent,
    JobRepairItemsComponent,
    LampHeadpieceModalComponent,
  ],
})
export class JobsModule {}
