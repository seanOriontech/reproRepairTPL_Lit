import { JobLampStatus } from '../enums/jobLampStatus.enum';
import { Job } from './job';
import { LampItem } from './lampItem';

export class JobLamp {
  itemLampID?: string;
  serialNumber?: string;
  headPieceNumber?: string | null;
  technicianID?: string | null;
  camNumber?: string | null;
  jobLampStatus?: JobLampStatus = JobLampStatus.reparing;
  jobID?: string;
  job?: Job | null;
  jobItems?: LampItem[] = [];
}
