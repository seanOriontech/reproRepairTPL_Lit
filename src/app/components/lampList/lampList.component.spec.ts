/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LampListComponent } from './lampList.component';

describe('LampListComponent', () => {
  let component: LampListComponent;
  let fixture: ComponentFixture<LampListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
