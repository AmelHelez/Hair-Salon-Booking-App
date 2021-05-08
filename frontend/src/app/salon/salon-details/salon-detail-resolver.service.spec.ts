/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalonDetailResolverService } from './salon-detail-resolver.service';

describe('Service: SalonDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalonDetailResolverService]
    });
  });

  it('should ...', inject([SalonDetailResolverService], (service: SalonDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
