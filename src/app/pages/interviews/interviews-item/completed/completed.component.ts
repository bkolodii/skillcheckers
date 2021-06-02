import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { DayEventsService } from 'src/app/service/day-events.service';
import { RequiredSkillsService } from 'src/app/service/required-skills.service';
import { Events } from 'src/app/shared/interfaces/events.interface';
import { RequiredSkills } from 'src/app/shared/interfaces/requiredSkill.interface';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {
  events: Array<any> = [];
  constructor(private eventsService: DayEventsService, private router: Router) { }

  ngOnInit(): void {
    this.getRequiredSkills();
  }

  getRequiredSkills(): void {
    this.eventsService.getAllEvents().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      take(1)
      
    ).subscribe(data => {
      this.events = data[1].countEvent;
      // this.getCalendarDays(this.date);
    });

  }
}
