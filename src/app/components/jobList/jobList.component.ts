import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-jobList',
  templateUrl: './jobList.component.html',
  styleUrls: ['./jobList.component.css'],
})
export class JobListComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() currentJob: number = 0;
  itemStatus: number = 0;
  selectedTechnicianID: string | undefined;

  jobList: Job[] = [];
  jobListFilter: Job[] = [];

  constructor(
    public jobService: JobService,
    private router: Router,
    public techService: TechService
  ) {
    this.techService.getItems().subscribe();
  }

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible']) {
      if (this.isVisible) {
        console.log('app-jobList is now visible');
        this.initZone();
        // Perform any additional actions when shown
      } else {
        console.log('app-jobList is now hidden');
        // Perform any additional actions when hidden
      }
    }
  }

  ngOnInit() {
    this.initZone();
  }

  initZone() {
    const savedTechnicianID = localStorage.getItem('selectedTechnicianID');
    if (savedTechnicianID) {
      this.selectedTechnicianID = savedTechnicianID;
    } else {
      this.jobListFilter = this.jobList; // Show full list if no saved selection
    }

    if (this.currentJob === 0) {
      this.jobService.getJobs().subscribe((data) => {
        this.filterJobsByTechnician(this.selectedTechnicianID ?? '');
      });
      this.jobService.getMines().subscribe((data) => {});
    } else {
      this.jobService.getCompleted().subscribe((data) => {
        this.jobList = this.jobService.jobs;
        this.jobListFilter = this.jobService.jobs;
      });
    }
  }

  addClick() {
    this.jobService.jobSelected = undefined;
    this.jobService.moveForward();
  }

  onTechnicianChange(event: any) {
    console.log('Selected Technician ID:', this.selectedTechnicianID);

    if (this.selectedTechnicianID) {
      // Save the selected technician ID to localStorage
      localStorage.setItem('selectedTechnicianID', this.selectedTechnicianID);
      this.filterJobsByTechnician(this.selectedTechnicianID);
    } else {
      // Clear the saved technician ID if none is selected
      localStorage.removeItem('selectedTechnicianID');
      this.jobListFilter = this.jobList;
    }
  }

  filterJobsByTechnician(technicianID: string) {
    if (technicianID == 'ALL') {
      this.jobListFilter = this.jobService.jobs;
    } else {
      this.jobListFilter = this.jobService.jobs.filter(
        (x) => x.technicianID === technicianID
      );
    }
  }

  onSubmit(event: any) {}
}
