/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobRepairComponent } from './jobRepair.component';

describe('JobRepairComponent', () => {
  let component: JobRepairComponent;
  let fixture: ComponentFixture<JobRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
