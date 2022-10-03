/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModuleManagerService } from './module-manager.service';

describe('Service: ModuleManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleManagerService]
    });
  });

  it('should ...', inject([ModuleManagerService], (service: ModuleManagerService) => {
    expect(service).toBeTruthy();
  }));
});
