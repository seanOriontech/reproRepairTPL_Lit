import { Component, OnInit } from '@angular/core';
import { JobLampStatus } from 'src/app/enums/jobLampStatus.enum';
import { Item } from 'src/app/models/item';
import { JobLamp } from 'src/app/models/jobLamp';
import { LampItem } from 'src/app/models/lampItem';
import { ItemService } from 'src/app/services/item.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobRepairItems',
  templateUrl: './jobRepairItems.component.html',
  styleUrls: ['./jobRepairItems.component.css'],
})
export class JobRepairItemsComponent implements OnInit {
  jobLamp: JobLamp = new JobLamp();
  selectedSegment: string = 'all';

  searchTerm: string = '';
  filteredItems: Item[] = [];
  filteredItemss: Item[] = [];
  JobLampStatus = JobLampStatus;

  constructor(public jobService: JobService, public itemService: ItemService) {}

  ngOnInit() {
    this.jobLamp = this.jobService.selectedJobLamp;

    this.itemService.getItems().subscribe(
      (items) => {
        this.filteredItems = items;
        this.filterItems();
      },
      (err) => {}
    );

    console.log(this.jobService.selectedJobLamp);
  }

  filterItems() {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (this.itemService.items) {
      // Filter items based on search term
      this.filteredItems = this.itemService.items.filter(
        (lamp) =>
          (lamp.name != undefined &&
            lamp?.name.toLowerCase().includes(searchTermLower)) ||
          lamp.p_Code?.toLowerCase().includes(searchTermLower)
      );

      // Sort items such that those with any color except white (#FFFFFF) are at the top
      this.filteredItems.sort((a, b) => {
        const colorA = a.colour ? a.colour.toLowerCase() : '';
        const colorB = b.colour ? b.colour.toLowerCase() : '';

        // Prioritize items that are not white
        if (colorA === '#ffffff') return 1; // Move white to the bottom
        if (colorB === '#ffffff') return -1; // Move non-white to the top

        // If both items are non-white, keep original order
        return 0;
      });
    }
  }

  clickComplete() {
    if (!this.validateJobLamp()) {
    } else {
      this.jobService
        .updateJobLamp(this.jobLamp, JobLampStatus.repeaired)
        .subscribe(
          (data) => {
            this.jobLamp.jobLampStatus = JobLampStatus.repeaired;
          },
          (err) => {}
        );
    }
  }

  validateJobLamp() {
    let missingFields: string[] = [];

    if (!this.jobLamp.serialNumber || this.jobLamp.serialNumber.trim() === '') {
      missingFields.push('Serial Number');
    }

    if (
      !this.jobLamp.headPieceNumber ||
      this.jobLamp.headPieceNumber.trim() === ''
    ) {
      missingFields.push('Head Piece Number');
    }

    if (
      !this.jobService.jobSelected?.technicianID ||
      this.jobService.jobSelected?.technicianID.trim() === ''
    ) {
      missingFields.push('Technician ID');
    }

    // Check if there are any missing fields
    if (missingFields.length > 0) {
      // Show an alert with the missing fields
      alert(
        `The following fields are missing or empty: ${missingFields.join(', ')}`
      );
      return true; // Indicate validation failed
    } else {
      return this.jobLamp; // Validation passed, return the jobLamp object
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterItems();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    console.log('Segment changed to: ', this.selectedSegment);
    // Add your logic here based on the selected segment
  }

  getActiveItem(item: Item) {
    var lampItem = this.jobService.selectedJobLamp.jobItems?.find(
      (x) => x.itemID == item.itemID
    );

    if (lampItem == undefined) {
      return false;
    }

    return true;
  }

  createRange(number: number) {
    if (number > 10) {
      number = 5;
    }
    return new Array(number);
  }

  updateMacAddress() {
    if (!this.jobLamp.macAddressQA || this.jobLamp.macAddressQA.length < 12) {
      console.warn('Invalid MAC address');
      return;
    }

    this.itemService.updateMAC(this.jobLamp).subscribe(() => {
      alert('UPDATED MAC');
    });

    // Call your API here
    console.log('Updating MAC to', this.jobLamp.macAddressQA);
  }

  valueClick(number: number, item: Item) {
    var lampItem = this.jobService.selectedJobLamp.jobItems?.find(
      (x) => x.itemID == item.itemID
    );

    console.log(lampItem);

    if (lampItem == undefined) {
      let newLampItem = new LampItem();
      newLampItem.itemID = item.itemID;
      newLampItem.jobLampID = this.jobService.selectedJobLamp.itemLampID;
      newLampItem.qauntity = number;

      if (this.jobService.selectedJobLamp.jobItems == undefined) {
        this.jobService.selectedJobLamp.jobItems = [];
      }

      this.jobService.selectedJobLamp.jobItems?.push(newLampItem);
      console.log(this.jobService.selectedJobLamp.jobItems);
    } else {
      lampItem.qauntity = number;
    }

    this.saveClick();
  }

  getColour(number: number, item: Item) {
    var lampItem = this.jobService.selectedJobLamp.jobItems?.find(
      (x) => x.itemID == item.itemID
    );

    if (lampItem == undefined) {
      return 'medium';
    } else if (lampItem.qauntity == number) {
      return 'primary';
    }
    return 'medium';
  }

  getRSelected(item: Item) {
    var lampItem = this.jobService.selectedJobLamp.jobItems?.find(
      (x) => x.itemID == item.itemID
    );

    if (!lampItem?.rSelected) {
      return 'medium';
    } else if (lampItem?.rSelected) {
      return 'primary';
    }
    return 'primary';
  }

  getRClick(item: Item) {
    var lampItem = this.jobService.selectedJobLamp.jobItems?.find(
      (x) => x.itemID == item.itemID
    );

    if (lampItem) {
      lampItem.rSelected = !lampItem.rSelected;
      this.saveClick();
    }
  }

  saveClick() {
    this.jobService
      .updateJobLampStatus(this.jobService.selectedJobLamp)
      .subscribe(
        (x) => {
          this.jobLamp.jobLampStatus = JobLampStatus.reparing;
          console.log(x);
        },
        (error) => {}
      );
  }
}
