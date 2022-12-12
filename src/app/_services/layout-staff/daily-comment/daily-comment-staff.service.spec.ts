/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DailyCommentStaffService } from './daily-comment-staff.service';

describe('Service: DailyCommentStaff', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyCommentStaffService]
    });
  });

  it('should ...', inject([DailyCommentStaffService], (service: DailyCommentStaffService) => {
    expect(service).toBeTruthy();
  }));
});
