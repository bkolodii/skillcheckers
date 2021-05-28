import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MesUserService } from 'src/app/service/mes-user.service';
import { ScrollToBottomDirective } from 'src/app/shared/directive/scroll-to-bottom.directive';
import { mesUser } from 'src/app/shared/interfaces/mesUser.interface';

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
  currDate: string = '10 JULY 2020';
  // messages = [
  //   {
  //     user: 'Albert Flores',
  //     userIcon: 'https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fuser12.png?alt=media&token=10805ccc-1c2c-402f-a44b-bb7c254ac069',
  //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eget magnis lorem feugiat nulla proin. Vestibulum purus, nec interdum augue eu blandit.',
  //     date: '6 JULY 2020',
  //     time: '10:45 AM',
  //     file: ''
  //   },
  //   {
  //     user: 'Benny Spanbauer',
  //     userIcon: 'https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fmainuser.png?alt=media&token=af373004-c2a6-4da3-bf5f-27f65199b1d9',
  //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eget',
  //     date: '8 JULY 2020',
  //     time: '10:45 AM',
  //     file: ''
  //   },
  //   {
  //     user: 'Albert Flores',
  //     userIcon: 'https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fuser12.png?alt=media&token=10805ccc-1c2c-402f-a44b-bb7c254ac069',
  //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eget magnis lorem feugiat nulla proin. Vestibulum purus, nec interdum augue eu blandit.',
  //     date: '8 JULY 2020',
  //     time: '10:45 AM',
  //     file: ''
  //   },
  //   {
  //     user: 'Benny Spanbauer',
  //     userIcon: 'https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fmainuser.png?alt=media&token=af373004-c2a6-4da3-bf5f-27f65199b1d9',
  //     text: '',
  //     date: '8 JULY 2020',
  //     time: '10:45 AM',
  //     file: {
  //       fileName: "file.pdf",
  //       url: "https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/message-file%2Ffile.pdf?alt=media&token=c1558651-d2ee-4bd2-8e7b-e874ef0da020",
  //     }
  //   },
  //   {
  //     user: 'Benny Spanbauer',
  //     userIcon: 'https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fmainuser.png?alt=media&token=af373004-c2a6-4da3-bf5f-27f65199b1d9',
  //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eget',
  //     date: '10 JULY 2020',
  //     time: '10:45 AM',
  //     file: ''
  //   },
  //   {
  //     user: 'Albert Flores',
  //     userIcon: 'https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fuser12.png?alt=media&token=10805ccc-1c2c-402f-a44b-bb7c254ac069',
  //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eget magnis lorem feugiat nulla proin. Vestibulum purus, nec interdum augue eu blandit.',
  //     date: '10 JULY 2020',
  //     time: '10:45 AM',
  //     file: ''
  //   },
  //   {
  //     user: 'Benny Spanbauer',
  //     userIcon: 'https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fmainuser.png?alt=media&token=af373004-c2a6-4da3-bf5f-27f65199b1d9',
  //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eget',
  //     date: '10 JULY 2020',
  //     time: '10:45 AM',
  //     file: ''
  //   },
  // ]
  messaging: Array<mesUser> = [];
  getText: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private mesUser: MesUserService, private storage: AngularFireStorage,) {
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

  getCurrUser(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('url');
    this.mesUser.getOne(name).onSnapshot(
      document => {
        document.forEach(prod => {
          const user = {
            id: prod.id,
            ...prod.data() as mesUser
          };
          this.currMesUser = user;

        });
      }
    );
  }
  getUser(): void {
    this.mesUser.getAllusers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (localStorage.getItem('mainuser')) {
        let user = JSON.parse(localStorage.getItem('mainuser'));
        this.messaging = data.filter(res => res.name == user.username)
      }
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
    if (!this.isDisabled) {
      if (this.getText) {
        const mess = {
          user: this.mainUser.username,
          userIcon: this.mainUser.icon,
          text: this.getText,
          date: '10 JULY 2020',
          time: '10:45 AM',
          file: this.uplFile ? this.uplFile : ''
        }
        this.currMesUser.messages.push(mess)
        // // this.currMesUser.messages = this.messages
        this.mesUser.update(this.currMesUser.id, this.currMesUser).finally(() => {
          console.log('success');
        })
        this.messaging[0].messages.push(mess)
        this.mesUser.update(this.messaging[0].id, this.messaging[0]).finally(() => {
          console.log('success');
        })


      } else {
        if (this.uplFile) {
          const mess = {
            user: this.mainUser.username,
            userIcon: this.mainUser.icon,
            text: this.getText ? this.getText : '',
            date: '10 JULY 2020',
            time: '10:45 AM',
            file: this.uplFile
          }
          // this.messages.push(mess)
          this.currMesUser.messages.push(mess)

          // this.currMesUser.messages = this.messages
          this.mesUser.update(this.currMesUser.id, this.currMesUser).finally(() => {
            console.log('success');
          })
          this.messaging[0].messages.push(mess)
          this.mesUser.update(this.messaging[0].id, this.messaging[0]).finally(() => {
            console.log('success');
          }) 
        }
      }
    }
    this.uplFile = null
    this.getText = '';
  }

}
