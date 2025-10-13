/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TechFormComponent } from './techForm.component';

describe('TechFormComponent', () => {
  let component: TechFormComponent;
  let fixture: ComponentFixture<TechFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
