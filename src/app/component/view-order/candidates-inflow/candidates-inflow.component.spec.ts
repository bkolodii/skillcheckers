import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesInflowComponent } from './candidates-inflow.component';

describe('CandidatesInflowComponent', () => {
  let component: CandidatesInflowComponent;
  let fixture: ComponentFixture<CandidatesInflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesInflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesInflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
