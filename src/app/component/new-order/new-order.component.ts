import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/shared/interfaces/question.interface';
import { map } from 'rxjs/operators';
import { AutofocusDirective } from '../../shared/directive/auto-focus.directive';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  isMainSkill: boolean = false;
  isAddSkill: boolean = false;
  isUnitName: boolean = false;
  isUnitLocation: boolean = false;
  isJobLocation: boolean = false;
  isSalary: boolean = false;
  isCurrency: boolean = false;
  isDate: boolean = false;
  isFont: boolean = false;
  questText: string = 'Lg';
  questions: Array<Question> = [];
  myheight: string = '0px';

  //   questions: Array<Question> = [{
  //     text: 'Lorem ipsum dolor sit amet?',
  //     id: 1,
  //     status: false
  //   }, {
  //     text: 'Lorem ipsum dolor sit amet?',
  //     id: 2,
  //     status: false
  //   }, 
  //   // {

  //   //   text: 'Lg|',
  //   //   id: 3,
  //   //   status: false
  //   // },
  // ]
  progNeedNumber: number = 1;
  experienceNumber: number = 4;
  prevQuestion: Question;
  isQuestion: boolean = true;
  isTextNode: boolean = true;
  constructor(private questService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestion();
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
      this.prevQuestion = this.questions[0]
    });

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
    // Use toUpperCase() to ignore character casing
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
    else if (item == 'font') {
      this.isFont = !this.isFont;
    }
    else if (item == 'question') {
      this.isQuestion = !this.isQuestion;
    }
    else if (item == 'notePad') {
      this.isTextNode = !this.isTextNode;
    }
  }

}
