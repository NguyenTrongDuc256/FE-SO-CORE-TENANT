/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuManagerService } from './menu-manager.service';

describe('Service: MenuManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuManagerService]
    });
  });

  it('should ...', inject([MenuManagerService], (service: MenuManagerService) => {
    expect(service).toBeTruthy();
  }));
});
