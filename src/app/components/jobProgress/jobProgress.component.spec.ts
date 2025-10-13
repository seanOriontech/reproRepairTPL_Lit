/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobProgressComponent } from './jobProgress.component';

describe('JobProgressComponent', () => {
  let component: JobProgressComponent;
  let fixture: ComponentFixture<JobProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
