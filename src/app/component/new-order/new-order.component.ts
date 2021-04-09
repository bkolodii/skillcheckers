import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/shared/interfaces/question.interface';
import { map } from 'rxjs/operators';
import { AutofocusDirective } from '../../shared/directive/auto-focus.directive';
import { RequiredSkills } from 'src/app/shared/interfaces/requiredSkill.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { RequiredSkillsService } from 'src/app/service/required-skills.service';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  isLorem: boolean = false;
  isMainSkill: boolean = false;
  isAddSkill: boolean = false;
  isUnitName: boolean = false;
  isUnitLocation: boolean = false;
  isJobLocation: boolean = false;
  isSalary: boolean = false;
  isCurrency: boolean = false;
  isDate: boolean = false;
  questText: string = 'Lg';
  myheight: string = '0px';
  progNeedNumber: number = 1;
  experienceNumber: number = 1;
  editOrder: RequiredSkills;
  position: string;
  mainSkil: string = '';
  unitName: string = '';
  unitLocation: string = '';
  jobLocation: string = '';
  dueDate = '11.09.2020';
  namesUnit: Array<string> = ['Tech HQ', 'Tech HQ', 'Tech HQ', 'Tech HQ', 'Tech HQ'];
  mainSkills: Array<string> = ['PHP', 'Java', 'C++', 'Flutter', 'iOS', 'UI UX', 'JS', 'C#', 'Python'];
  addSkills: Array<string> = ['PHP', 'Java', 'C++', 'Flutter', 'iOS', 'UI UX', 'JavaScript', 'C#', 'Python', 'HTML', 'CSS'];
  salaryRange: Array<string> = ['10,000 - 25,000', '25,000 - 50,000', '50,000 - 100,000', '100,000 - 120,000', '120,000 - 140,000', '140,000 - 160,000', '160,000 - 180,000', '180,000 - 200,000'];
  currencyRange: Array<string> = ['euro', 'pound', 'poland', 'hryvnia', 'dollar'];
  checkAddSkill: Array<string> = [];
  currCurrency: string = 'dollar';
  salary: string = '';
  questions: Array<Question> = [];
  prevQuestion: Question;
  isQuestion: boolean = true;
  isTextNode: boolean = true;
  skillScore: string = 'Any';
  kindJob: string = 'Any';
  workMode: string = 'Any';
  termOfContract: string = 'Any';
  editorForm: FormGroup;
  editorStyle = {
    height: '300px',
    border: 'none'
  }
  config = {
    toolbar: [
      [{ 'header': 1 }],
      ['bold', 'italic', 'underline'],
      [{ 'align': null }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
    ]
  }

  constructor(private questService: QuestionService, private requiredSkills: RequiredSkillsService) { }

  ngOnInit(): void {
    this.getQuestion();
    if (localStorage.getItem('edit-order')) {
      this.editOrder = JSON.parse(localStorage.getItem('edit-order'));
      this.parseOrder(this.editOrder)
    }
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  parseOrder(order: RequiredSkills): void {
    this.progNeedNumber = order.progNeed;
    this.experienceNumber = 4;
    this.position = order.name;
    this.mainSkil = order.mainSkill;
    this.unitName = order.unitName;
    this.unitLocation = order.unitLocation;
    this.jobLocation = order.unitLocation;
    this.dueDate = order.dueDate;
    this.checkAddSkill = order.additionalSkill.split(', ');
    this.salary = order.salaryRange;
    this.experienceNumber = order.yearExperience;
    this.skillScore = order.skillScore;
    this.kindJob = order.kindJob;
    this.workMode = order.workMode;
    this.termOfContract = order.termOfContract;

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
    if (item == 'name') {
      this.unitName = currName;
      // this.isUnitName = false;
    }
    else if (item == 'mainSkill') {
      this.mainSkil = currName;
      // this.isMainSkill = false;
    }
    else if (item == 'salary') {
      this.salary = currName;
      // this.isSalary = false;
    }
    else if (item == 'currency') {
      this.currCurrency = currName;
      // this.isCurrency = false;
    }
    else if (item == 'addSkill') {
      this.currCurrency = currName;
      // this.isAddSkill = false;
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
        this.progNeedNumber++;
      }
      else {
        if (this.progNeedNumber > 1) {
          this.progNeedNumber--;
        }
      }
    }
    else if (item == 'experience') {
      if (todo) {
        this.experienceNumber++;
      }
      else {
        if (this.experienceNumber > 1) {
          this.experienceNumber--;
        }
      }
    }
  }

  openHidden(item: string): void {
    if (item == 'mainSkill') {
      this.isMainSkill = !this.isMainSkill;
    }
    if (item == 'addSkill') {
      this.isAddSkill = !this.isAddSkill;
    }
    else if (item == 'unitName') {
      this.isUnitName = !this.isUnitName;
    }
    else if (item == 'unitLocation') {
      this.isUnitLocation = !this.isUnitLocation;
    }
    else if (item == 'jobLocation') {
      this.isJobLocation = !this.isJobLocation;
    }
    else if (item == 'salary') {
      this.isSalary = !this.isSalary;
    }
    else if (item == 'currency') {
      this.isCurrency = !this.isCurrency;
    }
    else if (item == 'date') {
      this.isDate = !this.isDate;
    }
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
      this.checkAddSkill.push(curr)
    }
  }

  deleteSkill(currId: number) {
    this.checkAddSkill.splice(currId, 1);
  }

  createNewOrder(): void {
    if (this.position && this.unitName && this.unitLocation && this.checkAddSkill.join(', ') && this.progNeedNumber && this.dueDate && this.salary && this.experienceNumber && this.skillScore && this.kindJob && this.workMode && this.termOfContract) {

      let arr = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()];
      const newOrder: RequiredSkills = {
        creationDate: arr.join('.'),
        name: this.position,
        unitName: this.unitName,
        unitLocation: this.unitLocation,
        mainSkill: this.mainSkil,
        additionalSkill: this.checkAddSkill.join(', '),
        progNeed: this.progNeedNumber,
        dueDate: this.dueDate,
        salaryRange: this.salary,
        yearExperience: this.experienceNumber,
        skillScore: this.skillScore,
        kindJob: this.kindJob,
        workMode: this.workMode,
        termOfContract: this.termOfContract,
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
    if (this.position && this.unitName && this.unitLocation && this.checkAddSkill.join(', ') && this.progNeedNumber && this.dueDate && this.salary && this.experienceNumber && this.skillScore && this.kindJob && this.workMode && this.termOfContract) {
      const item: RequiredSkills = JSON.parse(localStorage.getItem('edit-order'))
      const newOrder: RequiredSkills = {
        creationDate: item.creationDate,
        name: this.position,
        unitName: this.unitName,
        unitLocation: this.unitLocation,
        mainSkill: this.mainSkil,
        additionalSkill: this.checkAddSkill.join(', '),
        progNeed: this.progNeedNumber,
        dueDate: this.dueDate,
        salaryRange: this.salary,
        yearExperience: this.experienceNumber,
        skillScore: this.skillScore,
        kindJob: this.kindJob,
        workMode: this.workMode,
        termOfContract: this.termOfContract,
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
    this.position = '',
      this.unitName = '',
      this.unitLocation = '',
      this.mainSkil = '',
      this.checkAddSkill = [],
      this.progNeedNumber = 1,
      this.dueDate = '',
      this.salary = '',
      this.experienceNumber = 1,
      this.skillScore = 'Any',
      this.kindJob = 'Any',
      this.workMode = 'Any',
      this.termOfContract = 'Any'
  }

  onClickedOutsideItem(e: Event, item: string) {
    e.stopPropagation()
    if (item == 'mainSkill') {
      this.isMainSkill = false;
    }
    if (item == 'addSkill') {
      this.isAddSkill = false;
    }
    else if (item == 'unitName') {
      this.isUnitName = false;
    }
    else if (item == 'unitLocation') {
      this.isUnitLocation = false;
    }
    else if (item == 'jobLocation') {
      this.isJobLocation = false;
    }
    else if (item == 'salary') {
      this.isSalary = false;
    }
    else if (item == 'currency') {
      this.isCurrency = false;
    }
    else if (item == 'date') {
      this.isDate = false;
    }
  }
}
