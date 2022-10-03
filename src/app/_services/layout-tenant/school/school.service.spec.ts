import { TestBed } from '@angular/core/testing';

import { SchoolService } from './school.service';

describe('SchoolService', () => {
  let service: SchoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
    service.getList('', 1, 20).subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });
});
