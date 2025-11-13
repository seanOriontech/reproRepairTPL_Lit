import { JobLampStatus } from '../enums/jobLampStatus.enum';
import { Job } from './job';
import { LampItem } from './lampItem';

export class JobLamp {
  itemLampID?: string;
  serialNumber?: string;
  headPieceNumber?: string | null;
  technicianID?: string | null;
  camNumber?: string | null;
  macAddress?: string | null;
  macAddressQA?: string | null;
  cableLength?: number | null;
  hpMin?: number | null;
  ledBlueLight?: number | null;
  mainLEDLumens?: number | null;
  dateTest?: Date | null;
  qaCompleted?: boolean | null; // 👈 add this line
  dateTimeStarted?: Date | null;
  dateTimeCompleted?: Date | null;
  jobLampStatus?: JobLampStatus = JobLampStatus.reparing;
  jobID?: string;
  job?: Job | null;
  jobItems?: LampItem[] = [];
}
