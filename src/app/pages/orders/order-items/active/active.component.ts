import { Component, OnInit } from '@angular/core';
import { RequiredSkills } from 'src/app/shared/interfaces/requiredSkill.interface';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  unitNames: Array<string> = ['Tech HQ', 'Tech HQ', 'Tech HQ', 'Tech HQ', 'Tech HQ'];
  unitLocation: Array<string> = ['Seattle', 'Los-Angeless', 'London', 'New-York', 'Lviv'];
  vacancies: Array<RequiredSkills> = [
    {
      creationDate: '12.01.2020',
      name: 'Full-stack developer',
      unitName: 'Tech HQ',
      unitLocation: 'Seattle',
      mainSkill: 'Java',
      additionalSkill: 'JavaScript, HTML, CSS',
      progNeed: 4,
      dueDate: '04.08.2020'

    },
    {
      creationDate: '17.03.2020',
      name: 'PHP Developer',
      unitName: 'Tech HQ',
      unitLocation: 'Seattle',
      mainSkill: 'PHP',
      additionalSkill: 'HTML, CSS',
      progNeed: 2,
      dueDate: '17.05.2020'

    },
    {
      creationDate: '19.07.2020',
      name: 'Software Engineer',
      unitName: 'Tech HQ',
      unitLocation: 'Seattle',
      mainSkill: 'C++',
      additionalSkill: 'HTML, CSS',
      progNeed: 1,
      dueDate: '01.05.2020'

    },
    {
      creationDate: '17.04.2020',
      name: 'Flutter Mobile Developer',
      unitName: 'Tech HQ',
      unitLocation: 'Seattle',
      mainSkill: 'Flutter',
      additionalSkill: 'JavaScript',
      progNeed: 7,
      dueDate: '06.06.2020'

    },
    {
      creationDate: '06.01.2020',
      name: 'iOS Developer',
      unitName: 'Tech HQ',
      unitLocation: 'Seattle',
      mainSkill: 'iOS',
      additionalSkill: 'CSS',
      progNeed: 2,
      dueDate: '18.05.2020'

    },
    {
      creationDate: '11.09.2020',
      name: 'UI UX designer',
      unitName: 'Tech HQ',
      unitLocation: 'Seattle',
      mainSkill: 'UI UX',
      additionalSkill: 'HTML',
      progNeed: 1,
      dueDate: '03.11.2020'

    },
    {
      creationDate: '17.04.2020',
      name: 'C++ Developer',
      unitName: 'Tech HQ',
      unitLocation: 'Seattle',
      mainSkill: 'C++',
      additionalSkill: 'JavaScript',
      progNeed: 3,
      dueDate: '25.09.2020'

    },
    {
      creationDate: '05.03.2020',
      name: 'JS Developer',
      unitName: 'Tech HQ',
      unitLocation: 'Seattle',
      mainSkill: 'JS',
      additionalSkill: 'JavaScript, HTML, CSS',
      progNeed: 2,
      dueDate: '15.03.2020'
    }
  ];
  isName: boolean = false;
  isLocation: boolean = false;
  isDate: boolean = false;
  name: string = 'Unit name';
  location: string = 'Unit location';
  checkOption = null;
  constructor() { }

  ngOnInit(): void {
  }
  openHidden(item: string): void {
    if (item == 'name') {
      this.isName = !this.isName;
    }
    else if (item == 'location') {
      this.isLocation = !this.isLocation;
    }
    else {
      this.isDate = !this.isDate;
    }
  }
  chooseItem(currName: string, item: string): void {
    if (item == 'name') {
      this.name = currName;
      this.isName = false;
    }
    else {
      this.location = currName;
      this.isLocation = false;
    }

  }

  openOption(i: number): void {

    if (this.checkOption == i && this.checkOption !== null) {
      this.checkOption = null;
    }
    else {
      this.checkOption = i;
    }
  }
}
