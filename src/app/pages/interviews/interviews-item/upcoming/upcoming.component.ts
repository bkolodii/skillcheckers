import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { allEvents } from 'src/app/shared/interfaces/allEvents.interface';
import { Events } from 'src/app/shared/interfaces/events.interface';
import { Month } from 'src/app/shared/interfaces/month.interface';
const DAY_MS = 60 * 60 * 24 * 1000;
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {
  hover: string = 'Guy Hawkins';
  dates: Array<any>;
  date: Date = new Date(2021, 2, 5);
  days: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  month: Array<Month> = [
    {
      month: 0,
      monthName: 'January',
      dayCount: 31
    },
    {
      month: 1,
      monthName: 'February',
      dayCount: 28
    },
    {
      month: 2,
      monthName: 'March',
      dayCount: 31
    },
    {
      month: 3,
      monthName: 'April',
      dayCount: 30
    },
    {
      month: 4,
      monthName: 'May',
      dayCount: 31
    },
    {
      month: 5,
      monthName: 'June',
      dayCount: 30
    },
    {
      month: 6,
      monthName: 'July',
      dayCount: 31
    },
    {
      month: 7,
      monthName: 'August',
      dayCount: 31
    },
    {
      month: 8,
      monthName: 'September',
      dayCount: 30
    },
    {
      month: 9,
      monthName: 'October',
      dayCount: 31
    },
    {
      month: 10,
      monthName: 'November',
      dayCount: 30
    },
    {
      month: 11,
      monthName: 'December',
      dayCount: 31
    }
  ]
  events: Array<Events> = [
    {
      monthNumber: 2,
      dayNumber: 3,
      countEvent: [
        {
          personData: 'Bill Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '03.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        }
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 4,
      countEvent: [
        {
          personData: 'Skill Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '04.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        }
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 5,
      countEvent: [
        {
          personData: 'Guy Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '05.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        }
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 6,
      countEvent: [
        {
          personData: 'Edgar Torrey',
          personRate: 8.1,
          profesion: '.Net Software Engineer',
          interviewTime: '06.03.2021, 1.00 PM',
          interviewers: [
            '', ''
          ],
          orders: '.Net Software Engineer'
        },
        {
          personData: 'Lovern Laboy',
          personRate: 7.1,
          profesion: 'iOS Developer',
          interviewTime: '06.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Flutter Mobile Developer'
        },
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 8,
      countEvent: [
        {
          personData: 'Aileen Fullbright',
          personRate: 9.0,
          profesion: 'Java Developer',
          interviewTime: '08.03.2021, 4.30 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Software Engineer'
        },
        {
          personData: 'Hannah Burress',
          profesion: 'Java Developer',
          personRate: 8.2,
          interviewTime: '08.03.2021, 5.40 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Java Developer'
        },
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 10,
      countEvent: [
        {
          personData: 'Willard Purnell',
          personRate: 7.3,
          profesion: 'Flutter Developer',
          interviewTime: '10.03.2021, 1.30 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        },
        {
          personData: 'Florencio Dorrance',
          personRate: 6.6,
          profesion: 'C++ Developer',
          interviewTime: '10.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'C++ Developer'
        },
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 12,
      countEvent: [
        {
          personData: 'Johnatan Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '12.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        }
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 14,
      countEvent: [
        {
          personData: 'Joy Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '14.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        }
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 17,
      countEvent: [
        {
          personData: 'Sky Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '17.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        },
        {
          personData: 'Gray Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '17.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        },
        {
          personData: 'Maickle Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '17.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        },
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 20,
      countEvent: [
        {
          personData: 'Mishel Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '20.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        },
        {
          personData: 'Bob Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '20.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        },
        {
          personData: 'Bille Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '20.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        },
      ],
      yearNumber: 2021
    },
    {
      monthNumber: 2,
      dayNumber: 22,
      countEvent: [
        {
          personData: 'Blake Hawkins',
          personRate: 8.6,
          profesion: 'Java Developer',
          interviewTime: '22.03.2021, 3.00 PM',
          interviewers: [
            '', ''
          ],
          orders: 'Full-stack developer'
        }
      ],
      yearNumber: 2021
    },
  ]
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
  constructor() {

  }

  ngOnInit(): void {
    this.getCalendarDays(this.date);
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
    this.allEvents.forEach(
      (elem, index) => {
        elem.map((res, i) => {
          if (+res.interviewTime.split('.')[0] === this.currTime.currDay && +res.interviewTime.split('.')[1] === this.currTime.currMonth + 1 && +res.interviewTime.split('.')[2].substr(0, 4) === this.currTime.currYear) {
            if (i < 1) {
              for (let i = index; i < index + 4; i++) {
                if (this.allEvents[i]) {
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
