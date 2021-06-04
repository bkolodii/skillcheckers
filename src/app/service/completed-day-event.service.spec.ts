import { TestBed } from '@angular/core/testing';

import { CompletedDayEventService } from './completed-day-event.service';

describe('CompletedDayEventService', () => {
  let service: CompletedDayEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedDayEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
