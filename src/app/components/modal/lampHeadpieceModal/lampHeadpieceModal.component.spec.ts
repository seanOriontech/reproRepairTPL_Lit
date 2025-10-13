/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LampHeadpieceModalComponent } from './lampHeadpieceModal.component';

describe('LampHeadpieceModalComponent', () => {
  let component: LampHeadpieceModalComponent;
  let fixture: ComponentFixture<LampHeadpieceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampHeadpieceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampHeadpieceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
