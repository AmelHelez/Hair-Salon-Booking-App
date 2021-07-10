/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TreatmentService } from './treatment.service';

describe('Service: Treatment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreatmentService]
    });
  });

  it('should ...', inject([TreatmentService], (service: TreatmentService) => {
    expect(service).toBeTruthy();
  }));
});
