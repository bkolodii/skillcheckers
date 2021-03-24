import { TestBed } from '@angular/core/testing';

import { MesUserService } from './mes-user.service';

describe('MesUserService', () => {
  let service: MesUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
