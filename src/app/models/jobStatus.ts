import { UJobStatus } from '../enums/uJobStatus.enum';
import { Job } from './job';

export class JobStatus {
  jobStatusID?: string;
  dateTimeOffset?: Date;
  jobStatus?: UJobStatus;
  jobID?: string;
  job?: Job | null;
}
