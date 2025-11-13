import { JobStatus } from '../enums/jobStatus.enum';
import { UJobStatus } from '../enums/uJobStatus.enum';
import { JobItem } from './jobItem';
import { JobLamp } from './jobLamp';
import { Technician } from './technician';

export class Job {
  jobID?: string;
  rsNumber: string = '';
  mineId?: string = '';
  mine?: any = [];
  dateCreated?: Date = new Date();
  dateStart?: Date = new Date();
  dateEnd?: Date = new Date();
  rfq?: string = '';
  technitionID?: string = '';
  isRepair: boolean = false;
  isUpgrade: boolean = false;
  is12Volt: boolean = false;
  jobStatus?: UJobStatus = UJobStatus.Created;
  jobLamps?: JobLamp[] = [];
  jobStatuses?: JobStatus[] = [];
  technician?: Technician = undefined;
  technicianID?: string = undefined;
  technicianQAID?: string = undefined;
}
