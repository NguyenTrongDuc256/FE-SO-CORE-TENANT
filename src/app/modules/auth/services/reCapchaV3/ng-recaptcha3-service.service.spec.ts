/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgRecaptcha3ServiceService } from './ng-recaptcha3-service.service';

describe('Service: NgRecaptcha3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgRecaptcha3ServiceService]
    });
  });

  it('should ...', inject([NgRecaptcha3ServiceService], (service: NgRecaptcha3ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
