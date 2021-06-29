import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { MesUserService } from 'src/app/service/mes-user.service';
import { mesUser } from 'src/app/shared/interfaces/mesUser.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messaging: Array<mesUser> = [];
  constructor(private mesUserService: MesUserService,  private authService: AuthService) { }

  ngOnInit(): void {
    this.getMesUsers();
  }

  getMesUsers(): void {
    // this.mesUserService.getAllusers().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   ),
    //   take(1)
    // ).subscribe(data => {
      if (localStorage.getItem('mainuser')) {
        let user = JSON.parse(localStorage.getItem('mainuser'));
        this.messaging = user.usersMess;
        // this.messaging = data.filter(res => res.name !== user.username)
        // console.log(user);
      //   const userInfo = {
      //     ...user,
      //     usersMess : this.messaging
      //   }
      //   this.authService.update(user.id, userInfo)
      }
    // });

  }
}
