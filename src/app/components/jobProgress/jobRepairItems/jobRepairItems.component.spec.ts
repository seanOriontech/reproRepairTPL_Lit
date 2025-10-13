/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobRepairItemsComponent } from './jobRepairItems.component';

describe('JobRepairItemsComponent', () => {
  let component: JobRepairItemsComponent;
  let fixture: ComponentFixture<JobRepairItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRepairItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRepairItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
