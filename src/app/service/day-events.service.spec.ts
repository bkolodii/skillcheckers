import { TestBed } from '@angular/core/testing';

import { DayEventsService } from './day-events.service';

describe('DayEventsService', () => {
  let service: DayEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
