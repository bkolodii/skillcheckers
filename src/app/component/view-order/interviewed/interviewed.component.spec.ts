import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewedComponent } from './interviewed.component';

describe('InterviewedComponent', () => {
  let component: InterviewedComponent;
  let fixture: ComponentFixture<InterviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
