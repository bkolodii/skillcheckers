
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/shared/interfaces/question.interface';
import { map } from 'rxjs/operators';
import { RequiredSkills } from 'src/app/shared/interfaces/requiredSkill.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequiredSkillsService } from 'src/app/service/required-skills.service';
import { Month } from 'src/app/shared/interfaces/month.interface';
import { MonthService } from 'src/app/service/month.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  isLorem: boolean = false;
  isAddSkill: boolean = false;
  isCurrency: boolean = false;
  questText: string = '';
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
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent                      // text direction

    ]
  }

  constructor(private requiredSkills: RequiredSkillsService, public fb: FormBuilder, private monthService: MonthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.order = this.fb.group({
      programmer: this.fb.control(1, [Validators.required, Validators.min(1)]),
      experience: this.fb.control(1, [Validators.required, Validators.min(1)]),
      unitLocation: this.fb.control('', [Validators.required]),
      jobLocation: this.fb.control('', [Validators.required]),
      kindJob: this.fb.control('Remote', [Validators.required]),
      termOfContract: this.fb.control('Any', [Validators.required]),
      workMode: this.fb.control('Any', [Validators.required]),
      skillScore: this.fb.control('Any', [Validators.required]),
      unitName: this.fb.control('', [Validators.required]),
      mainSkil: this.fb.control('', [Validators.required]),
      salary: this.fb.control('', [Validators.required]),
      dueDate: this.fb.control('', [Validators.required]),
      addSkill: this.fb.array([], [Validators.required]),
      // addSkill: new FormControl({
      //   value: [],
      //   disabled: true
      // }),
    });
    this.editorForm = new FormGroup({
      'editor': new FormControl('')
    })
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
      // addSkill: order.additionalSkill.split(', ').map(res => this.fb.control(res)),
    })
    this.order.get('dueDate').patchValue(new Date(order.dueDate));
    let inputItem = this.order.get('addSkill') as FormArray
    order.additionalSkill.split(', ').forEach(el => {
      inputItem.push(this.fb.control(el))
    })
    console.log( this.editorForm.get('editor'));
    this.editorForm.get('editor').patchValue(this.editOrder.jobDesc)
    console.log( this.editorForm.get('editor'));
    this.questions = order.question ? order.question.sort(this.compare) : [];
    this.checkAddSkill = order.additionalSkill.split(', ')
  }
  chooseItem(currName: string, item: string): void {
    if (item == 'currency') {
      this.currCurrency = currName;
      this.isCurrency = false;
    }
    else if (item == 'addSkill') {
      this.isAddSkill = false;
    }

  }
  deleteQuest(i: number): void {
    this.questions.splice(i, 1);
    this.questions = this.questions.map((res, i) => {
      return {
        count: i + 1,
        text: res.text,
        status: res.status
      }
    })
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
    if (this.questText) {
      const newQuest: Question = {
        count: this.questions.length + 1,
        text: this.questText,
        status: false
      }
      this.questions.push(newQuest);
      this.questions = this.questions.sort(this.compare);
      this.questText = '';
    }
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
    if (item == 'addSkill') {
      this.isAddSkill = !this.isAddSkill;
    }
    else if (item == 'currency') {
      this.isCurrency = !this.isCurrency;
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
      this.checkAddSkill = this.order.get('addSkill').value;
      let itemsInput = this.order.get('addSkill') as FormArray;
      if (!this.checkAddSkill.some(res => res == curr)) {
        itemsInput.push(this.fb.control(curr))
      }
    }

  }

  deleteSkill(currId: number) {
    let itemsInput = this.order.get('addSkill') as FormArray;
    itemsInput.removeAt(currId)
  }

  createNewOrder(): void {
    console.log(this.editorForm);

    if (this.position && this.order.valid) {

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
        question: this.questions,
        jobDesc : this.editorForm.get('editor').value
      }
      this.requiredSkills.create(newOrder)
      this.requiredSkills.updOrder.subscribe(
        data => {
          this.questText = '';
          newOrder.id = data
          this.requiredSkills.update(data, newOrder).then(
            () => {
              this.resetAll();
              this.toastr.success(`You add new the order`, 'Adding success');
            }
          ).catch((e) => {
            console.log(e);
            this.toastr.error('Smth went wrong', 'Adding denied');
          })
        }
      )
    }
  }
  updateOrder(): void {

    if (this.position && this.order.valid) {

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
        id: item.id,
        question: this.questions,
        jobDesc : this.editorForm.get('editor').value
      }
      this.requiredSkills.update(newOrder.id, newOrder).then(
        () => {
          this.resetAll();
          this.toastr.success(`You edit the order`, 'Edding success');
          localStorage.removeItem('edit-order');
        }
      ).catch(
        (e) => {
          console.log(e);
          this.toastr.error('Smth went wrong', 'Edditing denied');
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
    this.editorForm.reset();
    this.questions = [];
    this.questText = '';
    this.position = '';
    this.checkAddSkill = [];
  }

  onClickedOutsideItem(e: Event, item: string) {
    e.stopPropagation()
    if (item == 'addSkill') {
      this.isAddSkill = false;
    }
    else if (item == 'currency') {
      this.isCurrency = false;
    }
  }
}
