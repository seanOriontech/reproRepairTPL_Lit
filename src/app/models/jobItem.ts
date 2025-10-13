import { LampItem } from './lampItem';

export class JobItem {
  itemID?: string;
  name?: string;
  p_Code?: string;
  max?: number;
  colour?: string;
  lampItems?: LampItem[] = [];
}
