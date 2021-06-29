import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { MesUserService } from 'src/app/service/mes-user.service';
import { MonthService } from 'src/app/service/month.service';
import { ScrollToBottomDirective } from 'src/app/shared/directive/scroll-to-bottom.directive';
import { mesUser } from 'src/app/shared/interfaces/mesUser.interface';
import { Month } from 'src/app/shared/interfaces/month.interface';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.scss']
})
export class MessagesDetailsComponent implements OnInit, AfterViewChecked {
  // @ViewChild(ScrollToBottomDirective)
  // scroll: ScrollToBottomDirective;
  @ViewChild('scroll') private myScrollContainer: ElementRef;
  mainUser;
  uplFile;
  isDisabled: boolean = false;
  currMesUser: mesUser;
  currDate: string = '';
  allUsers: Array<any>;
  messaging: Array<mesUser> = [];
  // getText: string;
  textInput: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required])
  });;
  subject: Subject<string> = new Subject<string>();
  userMessname: string;
  month: Array<Month> = [];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private monthService: MonthService, private authService: AuthService, private mesUser: MesUserService, private storage: AngularFireStorage,) {
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
    this.textInput.valueChanges.subscribe(res => {
      if ((res.text || this.uplFile) && res.text.charCodeAt(0) !== 32) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false
      }
    })
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
    // this.mesUser.getOne(name).onSnapshot(
    //   document => {
    //     document.forEach(prod => {
    //       const user = {
    //         id: prod.id,
    //         ...prod.data() as mesUser
    //       };
    //       this.currMesUser = user;

    //     });
    //   }
    // );
    if (localStorage.getItem('mainuser')) {
      let userInfo = JSON.parse(localStorage.getItem('mainuser'));
      // this.currMesUser = user.usersMess.filter(res => res.url == this.userMessname)[0];
      // this.messaging = user.usersMess;
      this.authService.getOne(userInfo.id).onSnapshot(
        document => {
          document.forEach(prod => {
            const user = {
              id: prod.id,
              ...prod.data()
            };
            this.subject.subscribe(item => {
              this.currMesUser = user.usersMess.filter(res => res.url == this.userMessname)[0];
              this.messaging = user.usersMess;
            })


          });
        }
      );
      // this.messaging = data.filter(res => res.name !== user.username)

    }
  }
  getUser(): void {
    // this.mesUser.getAllusers().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   )
    // ).subscribe(data => {
    // this.messaging = data.filter(res => res.name == user.username)
    // });
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
        this.isDisabled = false;
      });
    });
  }

  downloadFile(file): void {
    var element = document.createElement('a');
    element.setAttribute('href', file.url);
    element.setAttribute('download', file.fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  sendMessage(): void {
    console.log('sdfsdf');

    if (!this.isDisabled) {

      if ((this.textInput.get('text').value || this.uplFile) && this.textInput.get('text').value.charCodeAt(0) !== 32) {
        const mess = {
          user: this.mainUser.username,
          userIcon: this.mainUser.icon,
          text: this.textInput.get('text').value ? this.textInput.get('text').value : '',
          date: this.currDate,
          time: new Date().toLocaleString().split(', ')[1].substring(-1, 4) + new Date().toLocaleString().split(', ')[1].slice(-3),
          file: this.uplFile ? this.uplFile : '',
          dateForCheck: new Date().toLocaleString().split(', ')[0]
        }
        this.currMesUser.messages.push(mess)
        // // this.currMesUser.messages = this.messages
        // this.mesUser.update(this.currMesUser.id, this.currMesUser).finally(() => {
        //   console.log('success');
        // })
        // this.messaging[0].messages.push(mess)
        // this.mesUser.update(this.messaging[0].id, this.messaging[0]).finally(() => {
        //   console.log('success');
        // })
        this.messaging[this.messaging.map((res, i) => { if (res.url == this.currMesUser.url) { return i } })[0]] = this.currMesUser
        const user = {
          ...this.mainUser,
          usersMess: this.messaging
        }
        localStorage.setItem('mainuser', JSON.stringify(user))
        this.authService.update(this.mainUser.id, user).finally(() => {
          console.log('success')
          this.ngOnInit();
        })
        if (this.allUsers.some(res => res.username == this.currMesUser.name)) {
          let reciewUser = this.allUsers.find(res => res.username == this.currMesUser.name);
          let index = reciewUser.usersMess.map((res, i) => { if (res.name == this.mainUser.username) { return i } }).filter(res => res)[0]
          console.log(index);
          reciewUser.usersMess[index].messages = this.currMesUser.messages;
          this.authService.update(reciewUser.id, reciewUser).finally(() => {
            console.log('success')
            // this.ngOnInit();
          })
        }


      } else {
        // if (this.uplFile) {
        //   const mess = {
        //     user: this.mainUser.username,
        //     userIcon: this.mainUser.icon,
        //     text: this.getText ? this.getText : '',
        //     date: this.currDate,
        //     time: '10:45 AM',
        //     file: this.uplFile
        //   }
        //   // this.messages.push(mess)
        //   this.currMesUser.messages.push(mess)

        //   // this.currMesUser.messages = this.messages
        //   // this.mesUser.update(this.currMesUser.id, this.currMesUser).finally(() => {
        //   //   console.log('success');
        //   // })
        //   // this.messaging[0].messages.push(mess)
        //   // this.mesUser.update(this.messaging[0].id, this.messaging[0]).finally(() => {
        //   //   console.log('success');
        //   // }) 
        //   this.messaging[this.messaging.map((res, i) => { if (res.url == this.currMesUser.url) { return i } })[0]] = this.currMesUser
        //   const user = {
        //     ...this.mainUser,
        //     usersMess: this.messaging
        //   }
        //   localStorage.setItem('mainuser', JSON.stringify(user))
        //   this.authService.update(this.mainUser.id, user).finally(() => {
        //     console.log('success')
        //     this.ngOnInit();
        //   })
        //   if (this.allUsers.some(res => res.username == this.currMesUser.name)) {
        //     let reciewUser = this.allUsers.find(res => res.username == this.currMesUser.name);
        //     let index = reciewUser.usersMess.map((res, i) => { if (res.name == this.mainUser.username) { return i } }).filter(res => res)[0]
        //     console.log(index);
        //     reciewUser.usersMess[index].messages = this.currMesUser.messages;
        //     this.authService.update(reciewUser.id, reciewUser).finally(() => {
        //       console.log('success')
        //       // this.ngOnInit();
        //     })
        //   }
        // }
      }
    }
    this.uplFile = null
    this.textInput.reset();
  }

}
