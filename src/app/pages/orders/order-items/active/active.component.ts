import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequiredSkillsService } from 'src/app/service/required-skills.service';
import { RequiredSkills } from 'src/app/shared/interfaces/requiredSkill.interface';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  unitNames: Array<string> = ['Tech HQ', 'Tech HQ', 'Tech HQ', 'Tech HQ', 'Tech HQ'];
  unitLocation: Array<string> = ['Seattle', 'Los-Angeless', 'London', 'New-York', 'Lviv'];
  vacancies: Array<RequiredSkills> = [];
  // vacancies: Array<RequiredSkills> = [
  //   {
  //     creationDate: '12.01.2020',
  //     name: 'Full-stack developer',
  //     unitName: 'Tech HQ',
  //     unitLocation: 'Seattle',
  //     mainSkill: 'Java',
  //     additionalSkill: 'JavaScript, HTML, CSS',
  //     progNeed: 4,
  //     dueDate: '04.08.2020'

  //   },
  //   {
  //     creationDate: '17.03.2020',
  //     name: 'PHP Developer',
  //     unitName: 'Tech HQ',
  //     unitLocation: 'Seattle',
  //     mainSkill: 'PHP',
  //     additionalSkill: 'HTML, CSS',
  //     progNeed: 2,
  //     dueDate: '17.05.2020'

  //   },
  //   {
  //     creationDate: '19.07.2020',
  //     name: 'Software Engineer',
  //     unitName: 'Tech HQ',
  //     unitLocation: 'Seattle',
  //     mainSkill: 'C++',
  //     additionalSkill: 'HTML, CSS',
  //     progNeed: 1,
  //     dueDate: '01.05.2020'

  //   },
  //   {
  //     creationDate: '17.04.2020',
  //     name: 'Flutter Mobile Developer',
  //     unitName: 'Tech HQ',
  //     unitLocation: 'Seattle',
  //     mainSkill: 'Flutter',
  //     additionalSkill: 'JavaScript',
  //     progNeed: 7,
  //     dueDate: '06.06.2020'

  //   },
  //   {
  //     creationDate: '06.01.2020',
  //     name: 'iOS Developer',
  //     unitName: 'Tech HQ',
  //     unitLocation: 'Seattle',
  //     mainSkill: 'iOS',
  //     additionalSkill: 'CSS',
  //     progNeed: 2,
  //     dueDate: '18.05.2020'

  //   },
  //   {
  //     creationDate: '11.09.2020',
  //     name: 'UI UX designer',
  //     unitName: 'Tech HQ',
  //     unitLocation: 'Seattle',
  //     mainSkill: 'UI UX',
  //     additionalSkill: 'HTML',
  //     progNeed: 1,
  //     dueDate: '03.11.2020'

  //   },
  //   {
  //     creationDate: '17.04.2020',
  //     name: 'C++ Developer',
  //     unitName: 'Tech HQ',
  //     unitLocation: 'Seattle',
  //     mainSkill: 'C++',
  //     additionalSkill: 'JavaScript',
  //     progNeed: 3,
  //     dueDate: '25.09.2020'

  //   },
  //   {
  //     creationDate: '05.03.2020',
  //     name: 'JS Developer',
  //     unitName: 'Tech HQ',
  //     unitLocation: 'Seattle',
  //     mainSkill: 'JS',
  //     additionalSkill: 'JavaScript, HTML, CSS',
  //     progNeed: 2,
  //     dueDate: '15.03.2020'
  //   }
  // ];
  isName: boolean = false;
  isLocation: boolean = false;
  isDate: boolean = false;
  name: string = 'Unit name';
  location: string = 'Unit location';
  date: string = 'Creation date'
  checkOption = null;
  sortOptions: Array<any> = [];
  creatDate: Array<string> = ['creation date', 'name', 'due date'];
  constructor(private requiredSkills: RequiredSkillsService, private router: Router) { }

  ngOnInit(): void {
    this.getRequiredSkills();
  }

  getRequiredSkills(): void {
    this.requiredSkills.getAllrequiredSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.vacancies = data;
    });

  }
  closeOrder(currId: string): void {
    this.requiredSkills.delete(currId).then(
      () => {
        console.log('success');

      }
    )
  }
  openHidden(item: string): void {
    if (item == 'name') {
      this.isName = !this.isName;
    }
    else if (item == 'location') {
      this.isLocation = !this.isLocation;
    }
    else if (item == 'dates') {
      this.isDate = !this.isDate;
    }
  }
  onClickedOutsideItem(e: Event, item: string) {
    e.stopPropagation()
    if (item == 'name') {
      this.isName = false;
    }
    else if (item == 'location') {
      this.isLocation = false;
    }
    else if (item == 'dates') {
      this.isDate = false;
    }
  }
  chooseItem(currName: string, item: string): void {
    if (item == 'name') {
      this.name = currName;
    }
    else if (item == 'location') {
      this.location = currName;
    }
    else if (item == 'dates') {
      this.date = currName;
      console.log(this.date);

      this.vacancies.sort((a, b) => {
        if (this.date == 'creation date') {
          const bandA = a.creationDate;
          const bandB = b.creationDate;

          let comparison = 0;
          if (new Date(+bandA.split('.')[2], +bandA.split('.')[1] - 1, +bandA.split('.')[0]).valueOf() > new Date(+bandB.split('.')[2], +bandB.split('.')[1] - 1, +bandB.split('.')[0]).valueOf()) {
            comparison = 1;
          }
          else {
            comparison = -1;
          }

          return comparison;
        }
        else if (this.date == 'due date') {
          const bandA = a.dueDate;
          const bandB = b.dueDate;
          let comparison = 0;
          if (new Date(+bandA.split('.')[2], +bandA.split('.')[1] - 1, +bandA.split('.')[0]).valueOf() > new Date(+bandB.split('.')[2], +bandB.split('.')[1] - 1, +bandB.split('.')[0]).valueOf()) {
            comparison = 1;
          }
          else {
            comparison = -1;
          }
          return comparison;
        }
        else if (this.date == 'name') {
          const bandA = a.name;
          const bandB = b.name;

          let comparison = 0;
          if (bandA > bandB) {
            comparison = 1;
          }
          else {
            comparison = -1;
          }

          return comparison;
        }
      })
    }

  }

  addFilter(curr: string, sortItem: string): void {
    if (sortItem == 'location') {
      if (this.sortOptions.some(res => res.sortItem == 'location')) {
        this.sortOptions.forEach(res => {
          if (res.sortItem == 'location') {
            res.item = curr
          }
        })
      }
      else {
        this.sortOptions.push({
          item: curr,
          sortItem: sortItem
        })
      }
    }
    else if (sortItem == 'name') {
      if (this.sortOptions.some(res => res.sortItem == 'name')) {
        this.sortOptions.forEach(res => {
          if (res.sortItem == 'name') {
            res.item = curr
          }
        })

      }
      else {
        this.sortOptions.push({
          item: curr,
          sortItem: sortItem
        })
      }
    }
  }

  deleteFilter(currId: number, curr) {
    if (curr.sortItem == 'location') {
      this.location = "Unit location"
    } else if (curr.sortItem == 'name') {
      this.name = "Unit name"
    }
    this.sortOptions.splice(currId, 1);
  }
  editCurrOrder(currOrder): void {
    localStorage.setItem('edit-order', JSON.stringify(currOrder))
    this.router.navigateByUrl('/orders/new-order');
  }
  onClickedOutsideOption(e: Event, i: number) {
    if (this.checkOption == i && this.checkOption !== null) {
      e.stopPropagation();
      this.checkOption = null;
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

  compare(a: RequiredSkills, b: RequiredSkills) {
    console.log(this.date);

    if (this.date == 'creation date') {
      const bandA = a.creationDate;
      const bandB = b.creationDate;
      let comparison = 0;
      if (+bandA.split('.')[2] > +bandB.split('.')[2]) {
        if (+bandA.split('.')[1] > +bandB.split('.')[1]) {
          if (+bandA.split('.')[0] > +bandB.split('.')[0]) {
            comparison = 1;
          }
          else {
            comparison = -1;
          }
        }
        else {
          comparison = -1;
        }
      } else {
        comparison = -1;
      }

      return comparison;
    }

  }

}
