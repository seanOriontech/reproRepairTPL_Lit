/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LampItemComponent } from './lampItem.component';

describe('LampItemComponent', () => {
  let component: LampItemComponent;
  let fixture: ComponentFixture<LampItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
