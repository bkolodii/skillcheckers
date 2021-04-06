import { Component, OnInit } from '@angular/core';
import { MonthService } from 'src/app/service/month.service';
import { allEvents } from 'src/app/shared/interfaces/allEvents.interface';
import { Events } from 'src/app/shared/interfaces/events.interface';
import { Month } from 'src/app/shared/interfaces/month.interface';
import { map } from 'rxjs/operators';
import { DayEventsService } from 'src/app/service/day-events.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {
  hover: string = '';
  dates: Array<any> = [];
  date: Date = new Date(2021, 6, 5);
  days: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  month: Array<Month> = [];
  events: Array<Events> = [];
  currTime = {
    currMonth: 0,
    currYear: 0,
    currDay: 0,
  }
  currDate: string;
  allEvents: Array<Array<allEvents>> = [];
  fourDayEvents = [];
  // currDay: number = new Date().getDate();
  currDay: number = 5;
  constructor(private monthService: MonthService,
    private eventsService: DayEventsService) {
  }

  ngOnInit(): void {
    this.getMonth();
    this.getDayEvents()
  }


  getMonth(): void {
    this.monthService.getAllmonth().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.month = data;
      this.getDayEvents();

    });

  }

  getDayEvents(): void {
    this.eventsService.getAllEvents().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.events = data;
      this.getCalendarDays(this.date);
    });
  }

  getCalendarDays(date: Date = new Date): void {
    const currDayNumber: number = date.getDate()
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth: Date = new Date(year, month, 1);
    let day: string = firstDayOfMonth.toString().split(' ')[0];
    let dayNumber: number;
    this.days.forEach((res, i) => {
      if (res === day) {
        dayNumber = i;
      }
    })
    this.dates = this.range(1, this.month.find(res => {
      if (res.month == date.getMonth()) {
        this.currDate = `${res.monthName + ' ' + currDayNumber}, ${year}`;
        this.currTime.currMonth = res.month;
        this.currTime.currYear = year;
        this.currTime.currDay = currDayNumber;
        return res.dayCount;
      }
    }).dayCount)
    for (let i = 0; i < dayNumber; i++) {
      this.dates.unshift(' ');
    }
    this.getEvents(this.events);
  }

  getEvents(events: Array<Events>): void {
    this.clearEvent();
    this.allEvents = events.map(
      res => {
        return res.countEvent;
      }
    )
    this.allEvents = this.allEvents.sort(this.sortEvents)
    this.allEvents.forEach(
      (elem, ind) => {
        elem.map((res, index) => {
          if (+res.interviewTime.split('.')[0] === this.currTime.currDay && +res.interviewTime.split('.')[1] === this.currTime.currMonth + 1 && +res.interviewTime.split('.')[2].substr(0, 4) === this.currTime.currYear) {
            if (index < 1) {
              for (let i = ind; i < (ind + 4); i++) {
                if (this.allEvents[i] && +this.allEvents[i][0].interviewTime.split('.')[0] >= this.currTime.currDay) {
                  this.fourDayEvents.push(this.allEvents[i]);
                }
              }
            }
          }
        })
      }
    )
  }

  changeDate(yaer: number, month: number, day: number): void {
    if (month === 1) {
      if (day > 28) {
        this.currTime.currMonth = month;
        this.getCalendarDays(new Date(yaer, month, 28));
      }
      else {
        this.currTime.currMonth = month
        this.getCalendarDays(new Date(yaer, month, this.currTime.currDay));
      }
    }
    else {
      this.currTime.currMonth = month
      this.getCalendarDays(new Date(yaer, month, this.currTime.currDay));
    }
  }

  sortEvents(a, b) {
    if (a[0].interviewTime.split('.')[0] > b[0].interviewTime.split('.')[0]) {
      return 1;
    }
    if (a[0].interviewTime.split('.')[0] < b[0].interviewTime.split('.')[0]) {
      return -1;
    }
    return 0;
  }

  chooseDate(curr: Events): void {
    if (typeof curr !== 'string') {
      if (curr.hasOwnProperty('monthNumber')) {
        this.getCalendarDays(new Date(curr.yearNumber, curr.monthNumber, curr.dayNumber));
      }
      else {
        this.getCalendarDays(new Date(this.currTime.currYear, this.currTime.currMonth, curr.dayNumber));
      }
    }
    else {
      this.getCalendarDays(new Date(this.currTime.currYear, this.currTime.currMonth, this.currTime.currDay));
    }
  }

  private range(start: number, end: number, length: number = end - start + 1): Array<any> {
    let arr: Array<any> = Array.from({ length }, (_, i) => start + i);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < this.events.length; j++) {
        if (arr[i] == this.events[j].dayNumber && this.events[j].monthNumber === this.currTime.currMonth && this.events[j].yearNumber === this.currTime.currYear) {
          arr[i] = this.events[j];
          break;
        }
      }
    }
    arr = arr.map(res => {
      if (typeof res === 'number') {
        return res = {
          dayNumber: res,
          countEvent: []
        };
      }
      else {
        return res;
      }
    })
    return arr;
  }



  hoverCancel(status: boolean, person: string): void {
    if (status) {
      this.hover = person;
    }
    else {
      this.hover = null;
    }
  }

  clearEvent(): void {
    this.allEvents = [];
    this.fourDayEvents = [];
  }
}
