
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/shared/interfaces/question.interface';
import { map } from 'rxjs/operators';
import { RequiredSkills } from 'src/app/shared/interfaces/requiredSkill.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RequiredSkillsService } from 'src/app/service/required-skills.service';
import { Month } from 'src/app/shared/interfaces/month.interface';
import { MonthService } from 'src/app/service/month.service';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  isLorem: boolean = false;
  // isMainSkill: boolean = false;
  isAddSkill: boolean = false;
  // isUnitName: boolean = false;
  // isUnitLocation: boolean = false;
  // isJobLocation: boolean = false;
  // isSalary: boolean = false;
  isCurrency: boolean = false;
  // isDate: boolean = false;
  questText: string = 'Lg';
  myheight: string = '0px';
  editOrder: RequiredSkills;
  position: string;
  month: Array<Month> = [];
  namesUnit: Array<string> = ['Tech HQ', 'Tech HQ', 'Tech HQ', 'Tech HQ', 'Tech HQ'];
  mainSkills: Array<string> = ['PHP', 'Java', 'C++', 'Flutter', 'iOS', 'UI UX', 'JS', 'C#', 'Python'];
  addSkills: Array<string> = ['PHP', 'Java', 'C++', 'Flutter', 'iOS', 'UI UX', 'JavaScript', 'C#', 'Python', 'HTML', 'CSS'];
  salaryRange: Array<string> = ['10,000 - 25,000', '25,000 - 50,000', '50,000 - 100,000', '100,000 - 120,000', '120,000 - 140,000', '140,000 - 160,000', '160,000 - 180,000', '180,000 - 200,000'];
  currencyRange: Array<string> = ['icon-euro-currency-symbol', 'icon-pound-symbol-variant', 'icon-poland-zloty-currency-symbol', 'icon-ukraine-hryvna', 'icon-dollar'];
  checkAddSkill: Array<string> = [];
  currCurrency: string = 'icon-dollar';
  questions: Array<Question> = [];
  prevQuestion: Question;
  isQuestion: boolean = true;
  isTextNode: boolean = true;
  editorForm: FormGroup;
  order: FormGroup;
  editorStyle = {
    "min-height": '300px',
    border: 'none'
  }
  config = {
    toolbar: [
      [{ 'header': 1 }],
      ['bold', 'italic', 'underline'],
      [{ 'align': null }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
    ]
  }

  constructor(private questService: QuestionService, private requiredSkills: RequiredSkillsService, public fb: FormBuilder, private monthService: MonthService) { }

  ngOnInit(): void {
    this.getQuestion();
    this.order = this.fb.group({
      programmer: new FormControl(1),
      experience: new FormControl(1),
      unitLocation: new FormControl(''),
      jobLocation: new FormControl(''),
      kindJob: new FormControl('Remote'),
      termOfContract: new FormControl('Any'),
      workMode: new FormControl('Any'),
      skillScore: new FormControl('Any'),
      unitName: new FormControl(''),
      mainSkil: new FormControl(''),
      salary: new FormControl(''),
      dueDate: new FormControl(''),
      addSkill: new FormControl({
        value: [],
        disabled: true
      }),
    });
    if (localStorage.getItem('edit-order')) {
      this.editOrder = JSON.parse(localStorage.getItem('edit-order'));
      this.parseOrder(this.editOrder)
    }
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
    this.getMonth();

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
    });

  }
  parseOrder(order: RequiredSkills): void {
    this.position = order.name;
    this.order.patchValue({
      programmer: order.progNeed,
      experience: order.yearExperience,
      unitLocation: order.unitLocation,
      jobLocation: order.unitLocation,
      kindJob: order.kindJob,
      termOfContract: order.termOfContract,
      workMode: order.workMode,
      skillScore: order.skillScore,
      unitName: order.unitName,
      mainSkil: order.mainSkill,
      salary: order.salaryRange,
      addSkill: order.additionalSkill.split(', '),
    })
    this.order.get('dueDate').patchValue(new Date(order.dueDate));
    this.checkAddSkill = order.additionalSkill.split(', ')
  }

  getQuestion(): void {
    this.questService.getAllquest().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {

      this.questions = data.sort(this.compare);
      this.prevQuestion = this.questions[0];
    });

  }
  chooseItem(currName: string, item: string): void {
    // if (item == 'name') {
    //   this.order.patchValue({
    //     unitName: currName
    //   })
    //   this.isUnitName = false;
    // }
    // else if (item == 'mainSkill') {
    //   this.order.patchValue({
    //     mainSkil: currName
    //   })
    //   this.isMainSkill = false;
    // }
    // else if (item == 'salary') {
    //   this.order.patchValue({
    //     salary: currName
    //   })
    //   this.isSalary = false;
    // }
    if (item == 'currency') {
      this.currCurrency = currName;
      this.isCurrency = false;
    }
    else if (item == 'addSkill') {
      this.isAddSkill = false;
    }

  }
  deleteQuest(quest: Question): void {
    this.questService.delete(quest.id.toString())
      .then(() => {
        this.getQuestion()
      })
      .catch(err => {
        console.log(err);

      });
  }

  selectQuestion(curr: Question): void {
    if (this.prevQuestion) {
      this.prevQuestion.status = false;
      curr.status = true;
      this.prevQuestion = curr;
    }
    else {
      curr.status = true;
      this.prevQuestion = curr;
    }

  }

  addQuest(): void {
    const newQuest: Question = {
      count: this.questions.length + 1,
      text: this.questText,
      status: false
    }
    this.questService.create(newQuest)
    this.questService.updQuest.subscribe(
      data => {
        this.questText = '';
        newQuest.id = data
        this.questService.update(data, newQuest).then(
          () => {
            this.getQuestion()
          }
        )
      }
    )
  }
  compare(a: Question, b: Question) {

    const bandA = a.count;
    const bandB = b.count;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  counter(item: string, todo: boolean): void {
    if (item == 'progNeed') {
      if (todo) {
        this.order.patchValue({
          programmer: this.order.get('programmer').value + 1
        })
      }
      else {
        if (this.order.get('programmer').value > 1) {
          this.order.patchValue({
            programmer: this.order.get('programmer').value - 1
          })
        }
      }
    }
    else if (item == 'experience') {
      if (todo) {
        this.order.patchValue({
          experience: this.order.get('experience').value + 1
        });
      }
      else {
        if (this.order.get('experience').value > 1) {
          this.order.patchValue({
            experience: this.order.get('experience').value - 1
          });
        }
      }
    }
  }



  openHidden(item: string): void {
    // if (item == 'mainSkill') {
    //   this.isMainSkill = !this.isMainSkill;
    // }
    if (item == 'addSkill') {
      this.isAddSkill = !this.isAddSkill;
    }
    // else if (item == 'unitName') {
    //   this.isUnitName = !this.isUnitName;
    // }
    // else if (item == 'unitLocation') {
    //   this.isUnitLocation = !this.isUnitLocation;
    // }
    // else if (item == 'jobLocation') {
    //   this.isJobLocation = !this.isJobLocation;
    // }
    // else if (item == 'salary') {
    //   this.isSalary = !this.isSalary;
    // }
    else if (item == 'currency') {
      this.isCurrency = !this.isCurrency;
    }
    // else if (item == 'date') {
    //   this.isDate = !this.isDate;
    // }
    else if (item == 'question') {
      this.isQuestion = !this.isQuestion;
    }
    else if (item == 'notePad') {
      this.isTextNode = !this.isTextNode;
    }
    else if (item == 'lorem') {
      this.isLorem = !this.isLorem;
    }
  }


  addSkill(curr: string): void {
    if (this.checkAddSkill.length < 10) {
      this.checkAddSkill = this.order.get('addSkill').value;
      if (!this.checkAddSkill.some(res => res == curr)) {
        this.checkAddSkill.push(curr);
        this.order.get('addSkill').setValue(this.checkAddSkill)
      }
    }

  }

  deleteSkill(currId: number) {
    this.checkAddSkill = this.order.get('addSkill').value;
    this.checkAddSkill.splice(currId, 1);
    this.order.get('addSkill').setValue(this.checkAddSkill)
  }

  createNewOrder(): void {

    if (this.position && this.order.get('unitName').value && this.order.get('unitLocation').value && this.checkAddSkill.join(', ') && this.order.get('programmer').value && this.order.get('dueDate').value && this.order.get('salary').value && this.order.get('experience').value && this.order.get('skillScore').value && this.order.get('kindJob').value && this.order.get('workMode').value && this.order.get('termOfContract').value) {

      let date: string = new Date(this.order.get('dueDate').value).toString()
      let dayNumber: number;

      this.month.forEach((res, i) => {
        if (res.monthName.substr(0, 3) === date.toString().split(' ')[1]) {
          dayNumber = res.month;
        }
      })
      date = `${dayNumber + 1}.${date.toString().split(' ')[2]}.${date.toString().split(' ')[3]}`;
      let arr = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()];
      const newOrder: RequiredSkills = {
        creationDate: arr.join('.'),
        name: this.position,
        unitName: this.order.get('unitName').value,
        unitLocation: this.order.get('unitLocation').value,
        mainSkill: this.order.get('mainSkil').value,
        additionalSkill: this.order.get('addSkill').value.join(', '),
        progNeed: this.order.get('programmer').value,
        dueDate: date,
        salaryRange: this.order.get('salary').value,
        yearExperience: this.order.get('experience').value,
        skillScore: this.order.get('skillScore').value,
        kindJob: this.order.get('kindJob').value,
        workMode: this.order.get('workMode').value,
        termOfContract: this.order.get('termOfContract').value,
      }
      this.requiredSkills.create(newOrder)
      this.requiredSkills.updOrder.subscribe(
        data => {
          this.questText = '';
          newOrder.id = data
          this.requiredSkills.update(data, newOrder).then(
            () => {
              this.resetAll();
            }
          ).catch((e) => {
            console.log(e);

          })
        }
      )
    }
  }
  updateOrder(): void {

    if (this.position && this.order.get('unitName').value && this.order.get('unitLocation').value && this.checkAddSkill.join(', ') && this.order.get('programmer').value && this.order.get('dueDate').value && this.order.get('salary').value && this.order.get('experience').value && this.order.get('skillScore').value && this.order.get('kindJob').value && this.order.get('workMode').value && this.order.get('termOfContract').value) {

      let date: string = new Date(this.order.get('dueDate').value).toString()
      let dayNumber: number;

      this.month.forEach((res, i) => {
        if (res.monthName.substr(0, 3) === date.toString().split(' ')[1]) {
          dayNumber = res.month;
        }
      })
      date = `${dayNumber + 1}.${date.toString().split(' ')[2]}.${date.toString().split(' ')[3]}`;
      const item: RequiredSkills = JSON.parse(localStorage.getItem('edit-order'))
      const newOrder: RequiredSkills = {
        creationDate: item.creationDate,
        name: this.position,
        unitName: this.order.get('unitName').value,
        unitLocation: this.order.get('unitLocation').value,
        mainSkill: this.order.get('mainSkil').value,
        additionalSkill: this.order.get('addSkill').value.join(', '),
        progNeed: this.order.get('programmer').value,
        dueDate: date,
        salaryRange: this.order.get('salary').value,
        yearExperience: this.order.get('experience').value,
        skillScore: this.order.get('skillScore').value,
        kindJob: this.order.get('kindJob').value,
        workMode: this.order.get('workMode').value,
        termOfContract: this.order.get('termOfContract').value,
        id: item.id
      }
      this.requiredSkills.update(newOrder.id, newOrder).then(
        () => {
          this.resetAll();
          localStorage.removeItem('edit-order');
        }
      ).catch(
        (e) => {
          console.log(e);

        }
      )
    }
  }
  resetAll(): void {
    this.order.reset({
      programmer: 1,
      experience: 1,
      unitLocation: '',
      jobLocation: '',
      kindJob: 'Any',
      termOfContract: 'Any',
      workMode: 'Any',
      skillScore: 'Any',
      unitName: '',
      mainSkil: '',
      salary: '',
      dueDate: '',
      addSkill: []
    })

    this.position = '';
    this.checkAddSkill = [];
  }

  onClickedOutsideItem(e: Event, item: string) {
    e.stopPropagation()
    // if (item == 'mainSkill') {
    //   this.isMainSkill = false;
    // }
    if (item == 'addSkill') {
      this.isAddSkill = false;
    }
    // else if (item == 'unitName') {
    //   this.isUnitName = false;
    // }
    // else if (item == 'unitLocation') {
    //   this.isUnitLocation = false;
    // }
    // else if (item == 'jobLocation') {
    //   this.isJobLocation = false;
    // }
    // else if (item == 'salary') {
    //   this.isSalary = false;
    // }
    else if (item == 'currency') {
      this.isCurrency = false;
    }
    // else if (item == 'date') {
    //   this.isDate = false;
    // }
  }
}
