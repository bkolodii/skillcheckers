import { TestBed } from '@angular/core/testing';

import { RequiredSkillsService } from './required-skills.service';

describe('RequiredSkillsService', () => {
  let service: RequiredSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequiredSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
