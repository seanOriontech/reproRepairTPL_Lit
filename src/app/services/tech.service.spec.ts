/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TechService } from './tech.service';

describe('Service: Tech', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechService]
    });
  });

  it('should ...', inject([TechService], (service: TechService) => {
    expect(service).toBeTruthy();
  }));
});
