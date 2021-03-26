import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsItemComponent } from './interviews-item.component';

describe('InterviewsItemComponent', () => {
  let component: InterviewsItemComponent;
  let fixture: ComponentFixture<InterviewsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
