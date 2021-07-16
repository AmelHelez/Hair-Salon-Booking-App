/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeGuardService } from './employee-guard.service';

describe('Service: EmployeeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeGuardService]
    });
  });

  it('should ...', inject([EmployeeGuardService], (service: EmployeeGuardService) => {
    expect(service).toBeTruthy();
  }));
});
