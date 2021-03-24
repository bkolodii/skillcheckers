import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MesUserService } from 'src/app/service/mes-user.service';
import { mesUser } from 'src/app/shared/interfaces/mesUser.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messaging: Array<mesUser> = [];
  // messaging: Array<mesUser> = [
  //   {
  //     img: '../../../assets/image/user1.png',
  //     name: 'Guy Hawkins',
  //     time: '11:15',
  //     missing: 2,
  //     text: 'Please give us feedback...',
  //     url: "Guy_Hawkins"
  //   },
  //   {
  //     img: '../../../assets/image/user2.png',
  //     name: 'Darlene Robertson',
  //     time: '11:15',
  //     missing: 1,
  //     text: 'Please give us feedback...',
  //     url: "Darlene_Robertson"
  //   },
  //   {
  //     img: '../../../assets/image/user3.png',
  //     name: 'Brooklyn Simmons',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Brooklyn_Simmons"
  //   },
  //   {
  //     img: '../../../assets/image/user4.png',
  //     name: 'Albert Flores',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Albert_Flores"
  //   },
  //   {
  //     img: '../../../assets/image/user5.png',
  //     name: 'Kylee Danford',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Kylee_Danford"
  //   },
  //   {
  //     img: '../../../assets/image/user6.png',
  //     name: 'Jacob Jones',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Jacob_Jones"
  //   },
  //   {
  //     img: '../../../assets/image/user7.png',
  //     name: 'Elmer Laverty',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Elmer_Laverty"
  //   },
  //   {
  //     img: '../../../assets/image/user8.png',
  //     name: 'Charolette Hanlin',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Charolette_Hanlin"

  //   },
  //   {
  //     img: '../../../assets/image/user9.png',
  //     name: 'Sanjuanita Ordonez',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Sanjuanita_Ordonez"
  //   },
  //   {
  //     img: '../../../assets/image/user10.png',
  //     name: 'Alfonzo Schuessler',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Alfonzo_Schuessler"
  //   },
  //   {
  //     img: '../../../assets/image/user11.png',
  //     name: 'Merrill Kervin',
  //     time: '11:15',
  //     missing: 0,
  //     text: 'Please give us feedback...',
  //     url: "Merrill_Kervin"
  //   },
  // ]
  constructor(private mesUserService: MesUserService) { }

  ngOnInit(): void {
    this.getMesUsers();
  }

  getMesUsers(): void {
    this.mesUserService.getAllusers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.messaging = data;
    });

  }
}
