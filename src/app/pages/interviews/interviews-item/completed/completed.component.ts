import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CompletedDayEventService } from 'src/app/service/completed-day-event.service';
import { DayEventsService } from 'src/app/service/day-events.service';
import { completedDayEventsClass } from 'src/app/shared/classes/completedDayEvents.model';
import { completedDayEvents } from 'src/app/shared/interfaces/completedDayEvents.interface';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {
  events: Array<completedDayEvents> = [];
  rates: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isModal: boolean = false;
  currPerson: completedDayEvents;
  count: number = 0;
  constructor(private completedDayEventsService: CompletedDayEventService, private router: Router) { }

  ngOnInit(): void {
    this.getRequiredSkills();
  }

  getRequiredSkills(): void {
    this.completedDayEventsService.getAllEvents().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      take(1)

    ).subscribe(data => {
      this.events = data.sort(this.compare)
    });

  }

  compare(a: completedDayEvents, b: completedDayEvents): number {
    const bandA = a.data;
    const bandB = b.data;
    let comparison = 0;
    if (new Date(+bandA.split('.')[2], +bandA.split('.')[1] - 1, +bandA.split('.')[0]).valueOf() > new Date(+bandB.split('.')[2], +bandB.split('.')[1] - 1, +bandB.split('.')[0]).valueOf()) {
      comparison = 1;
    }
    else {
      comparison = -1;
    }

    return comparison;
  }

  openModal(currPerson: completedDayEvents): void {
    this.currPerson = new completedDayEventsClass(currPerson.id, currPerson.icon, currPerson.name, currPerson.prof_skill, currPerson.data, currPerson.time, currPerson.interviewers, currPerson.order, currPerson.skillscore, currPerson.ourscore);
    this.isModal = true;
  }
  closeModal(): void {
    this.currPerson = {
      id: '',
      icon: '',
      name: '',
      prof_skill: '',
      data: '',
      time: '',
      interviewers: [],
      order: '',
      skillscore: '',
      ourscore: ''
    };
    this.isModal = false;
    this.count = 0;
  }

  onClickedOutsideItem(e: Event) {
    if (this.count == 0) {
      this.count += 1;
    } else {
      this.isModal = false;
      e.stopPropagation()
      this.count = 0;
    }
  }

  chooseMark(i): void {
    this.currPerson.ourscore = `${i}`;
    console.log(this.currPerson);
  }

  submit(): void {
    this.completedDayEventsService.update(this.currPerson.id, this.currPerson).finally(() => {
      this.isModal = false;
      this.count = 0;
    })
  }



}
