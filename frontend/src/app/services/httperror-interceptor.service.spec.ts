/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttperrorInterceptorService } from './httperror-interceptor.service';

describe('Service: HttperrorInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttperrorInterceptorService]
    });
  });

  it('should ...', inject([HttperrorInterceptorService], (service: HttperrorInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
