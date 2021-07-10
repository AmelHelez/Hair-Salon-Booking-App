/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalonTreatmentService } from './salon-treatment.service';

describe('Service: SalonTreatment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalonTreatmentService]
    });
  });

  it('should ...', inject([SalonTreatmentService], (service: SalonTreatmentService) => {
    expect(service).toBeTruthy();
  }));
});
