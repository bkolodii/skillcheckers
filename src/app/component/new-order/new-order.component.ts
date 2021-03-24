import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/interfaces/question.interface';

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


  questions: Array<Question> = [{
    text: 'Lorem ipsum dolor sit amet?',
    id: 1,
    status: false
  }, {
    text: 'Lorem ipsum dolor sit amet?',
    id: 2,
    status: false
  }, 
  // {

  //   text: 'Lg|',
  //   id: 3,
  //   status: false
  // },
]
  prevQuestion : Question;
  constructor() { }

  ngOnInit(): void {
  }

  selectQuestion(curr: Question): void {
    if(this.prevQuestion){
      this.prevQuestion.status = false;
      curr.status = true;
      this.prevQuestion = curr;
    }
    else{
      curr.status = true;
      this.prevQuestion = curr;
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
  }

}
