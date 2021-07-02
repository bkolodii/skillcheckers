import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { MesUserService } from 'src/app/service/mes-user.service';
import { MonthService } from 'src/app/service/month.service';
import { ScrollToBottomDirective } from 'src/app/shared/directive/scroll-to-bottom.directive';
import { Files } from 'src/app/shared/interfaces/file.interface';
import { Message } from 'src/app/shared/interfaces/messages.interface';
import { mesUser } from 'src/app/shared/interfaces/mesUser.interface';
import { Month } from 'src/app/shared/interfaces/month.interface';
import { Users } from 'src/app/shared/interfaces/users.interface';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.scss']
})
export class MessagesDetailsComponent implements OnInit, AfterViewChecked, OnChanges {
  @ViewChild('scroll') private myScrollContainer: ElementRef;
  mainUser: Users;
  uplFile: Files;
  isDisabled: boolean = false;
  currMesUser: mesUser;
  currDate: string = '';
  allUsers: Array<Users>;
  messaging: Array<mesUser> = [];
  checkOption: number = null;
  deleteIndex: number = null;
  textInput: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });
  deleteForm: FormGroup = new FormGroup({
    checkbox: new FormControl(false)
  })
  subject: Subject<string> = new Subject<string>();
  userMessname: string;
  month: Array<Month> = [];
  editMessage: number = null;
  isEdit: boolean = false;
  isModal: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private monthService: MonthService,
    private authService: AuthService,
    private mesUser: MesUserService,
    private storage: AngularFireStorage) {
    this.router.events.subscribe(res => {
      if (res.hasOwnProperty('routerEvent')) {
        this.ngOnInit();
      }
    })
  }

  ngOnInit(): void {
    this.getMainUser();
    this.getCurrUser();
    this.getUser();
    this.getMonth();
    // setInterval(() => { this.ngOnInit() }, 1000)
    this.textInput.valueChanges.subscribe(res => {
      if ((res.text && res.text.charCodeAt(0) !== 32) || this.uplFile) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    this.ngOnInit();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getMainUser(): void {
    if (localStorage.getItem('mainuser')) {
      this.mainUser = JSON.parse(localStorage.getItem('mainuser'));
    }
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
      this.currDate = `${new Date().getDate()} ${this.month[new Date().getMonth()].monthName} ${new Date().getFullYear()}`
      this.subject.next(this.currDate)
    });

  }

  getCurrUser(): void {
    this.userMessname = this.activatedRoute.snapshot.paramMap.get('url');
    if (localStorage.getItem('mainuser')) {
      let userInfo: Users = JSON.parse(localStorage.getItem('mainuser'));
      this.authService.getOne(userInfo.id).onSnapshot(
        document => {
          document.forEach(prod => {
            const user = {
              id: prod.id,
              ...prod.data() as Users
            };
            this.subject.pipe(take(1)).subscribe(item => {
              this.currMesUser = user.usersMess.filter(res => res.url == this.userMessname)[0];
              this.messaging = user.usersMess;
            })
          });
        }
      );
    }
  }

  getUser(): void {
    this.authService.getAllusers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      take(1)
    ).subscribe(data => {
      this.allUsers = data
    });
  }


  getFile(event): void {
    const file = event.target.files[0];
    const filePath = `message-file/${file.name}`;
    const upload = this.storage.upload(filePath, file);
    this.isDisabled = true;

    upload.then(file => {
      this.storage.ref(`message-file/${file.metadata.name}`).getDownloadURL().subscribe(url => {
        this.uplFile = {
          url: url,
          fileName: file.metadata.name
        }
      });
    });
  }

  downloadFile(file: Files): void {
    var element = document.createElement('a');
    element.setAttribute('href', file.url);
    element.setAttribute('target', '_blank');
    element.setAttribute('download', file.fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  sendMessage(): void {
    if (this.isDisabled) {
      if ((this.textInput.get('text').value && this.textInput.get('text').value.charCodeAt(0) !== 32) || this.uplFile) {
        const mess: Message = {
          user: this.mainUser.username,
          userIcon: this.mainUser.icon,
          text: this.textInput.get('text').value ? this.textInput.get('text').value : '',
          date: this.currDate,
          time: moment().format('LT'),
          file: this.uplFile ? this.uplFile : '',
          dateForCheck: new Date().toLocaleString().split(', ')[0]
        }
        this.currMesUser.messages.push(mess);
        this.submit();
      }
    }
    this.uplFile = null
    this.textInput.reset();
  }

  openOption(i: number, e?: Event): void {
    if (this.checkOption == i && this.checkOption !== null) {
      this.onClickedOutsideOption(e, i)
    }
    else {
      this.checkOption = i;
    }
  }

  onClickedOutsideOption(e: Event, i: number) {
    if (this.checkOption == i && this.checkOption !== null) {
      this.checkOption = null;
      e.stopPropagation();
    }
  }

  editCurrMess(currMes, i): void {
    this.textInput.get('text').patchValue(currMes.text);
    this.editMessage = i;
    this.isEdit = true
    if (currMes.file) {
      this.uplFile = currMes.file;
      this.isDisabled = true
    }
  }

  deleteCurrMess(i): void {
    this.isModal = true;
    this.deleteIndex = i;
  }


  sendEditMessage(): void {
    if (this.isDisabled) {
      if ((this.textInput.get('text').value || this.uplFile) && this.textInput.get('text').value.charCodeAt(0) !== 32) {
        this.currMesUser.messages[this.editMessage].text = this.textInput.get('text').value ? this.textInput.get('text').value : '';
        this.currMesUser.messages[this.editMessage].file = this.uplFile ? this.uplFile : '';
        this.submit();
      }
    }
    this.uplFile = null
    this.textInput.reset();
    this.isEdit = false;
  }

  delete(): void {
    this.currMesUser.messages.splice(this.deleteIndex, 1);
    this.messaging[this.messaging.map((res, i) => { if (res.url == this.currMesUser.url) { return i } })[0]] = this.currMesUser
    const user: Users = {
      ...this.mainUser,
      usersMess: this.messaging
    }
    localStorage.setItem('mainuser', JSON.stringify(user))
    this.authService.update(this.mainUser.id, user).finally(() => {
      this.ngOnInit();
    })
    if (this.allUsers.some(res => res.username == this.currMesUser.name) && this.deleteForm.get('checkbox').value) {
      this.updUser();
    }
    this.closeModal();
  }

  submit(): void {
    this.messaging[this.messaging.map((res, i) => { if (res.url == this.currMesUser.url) { return i } })[0]] = this.currMesUser
    const user: Users = {
      ...this.mainUser,
      usersMess: this.messaging
    }
    localStorage.setItem('mainuser', JSON.stringify(user))
    this.authService.update(this.mainUser.id, user).finally(() => {
      this.ngOnInit();
    })
    if (this.allUsers.some(res => res.username == this.currMesUser.name)) {
      this.updUser();
    }
  }

  closeModal(): void {
    this.isModal = false;
    this.deleteIndex = null;
    this.deleteForm.reset();
  }

  updUser(): void {
    let reciewUser = this.allUsers.find(res => res.username == this.currMesUser.name);
    let index = reciewUser.usersMess.map((res, i) => { if (res.name == this.mainUser.username) { return i } }).filter(res => res)[0]
    reciewUser.usersMess[index].messages = this.currMesUser.messages;
    this.authService.update(reciewUser.id, reciewUser).finally(() => {
      this.ngOnInit();
    })
  }

  onClickedOutsideItem(e: Event) {
    e.stopPropagation()
    this.closeModal();
  }
}
