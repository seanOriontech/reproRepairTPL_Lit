import { Item } from './item';
import { JobLamp } from './jobLamp';

export class LampItem {
  jobLampID?: string;
  jobLamp?: JobLamp | null;
  itemID?: string;
  item?: Item | null;
  itemStatus?: any | null;
  qauntity?: number | null;
  rSelected: boolean = false;

  constructor() {
    this.jobLamp = null;
    this.item = null;
    this.itemStatus = null;
    this.qauntity = null;
    this.rSelected = false;
  }
}
