/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LampAddComponent } from './lampAdd.component';

describe('LampAddComponent', () => {
  let component: LampAddComponent;
  let fixture: ComponentFixture<LampAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
