import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MesUserService } from 'src/app/service/mes-user.service';
import { ScrollToBottomDirective } from 'src/app/shared/directive/scroll-to-bottom.directive';
import { mesUser } from 'src/app/shared/interfaces/mesUser.interface';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.scss']
})
export class MessagesDetailsComponent implements OnInit {
  @ViewChild(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;
  mainUser;
  currMesUser: mesUser;
  getText: string;
  constructor( private activatedRoute: ActivatedRoute, private mesUser: MesUserService) { }

  ngOnInit(): void {
    this.getMainUser();
    this.getCurrUser();
  }

  getMainUser():void{
    if(localStorage.getItem('mainuser')){
      console.log(localStorage.getItem('mainuser'));
      
      this.mainUser = JSON.parse(localStorage.getItem('mainuser'));
      console.log(this.mainUser);
      
    }
  }
  getCurrUser(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('url');
    console.log(name);
    
    this.mesUser.getOne(name).onSnapshot(
      document => {
        document.forEach(prod => {
          const user = {
            id: prod.id,
            ...prod.data() as mesUser
          };
          this.currMesUser = user;
          console.log(this.currMesUser);
          
        });
      }
    );
  }
  sendMessage():void{
   if(this.getText){
    document.querySelector('.chat__conversation--text').innerHTML += ` <div class="user-recieve-reverse">
    <img class="user-recieve-reverse__logo"
      src="${this.mainUser.icon}"
      alt="">
    <div class="user-recieve-reverse__person-data">
      <h2 class="user-recieve-reverse__person-data--title">
        ${this.mainUser.username}
      </h2>
      <p class="user-recieve-reverse__person-data--text">
       ${this.getText}
      </p>
    </div>
    <div class="user-recieve-reverse__other-data">
      <p class="user-recieve-reverse__other-data--time">
        ${new Date().toString().split(' ')[4].substr(0,5)} AM
      </p>
    </div>
  </div>`
   }
  console.log(new Date().toString().split(' ')[4].substr(0,5));
  

  this.getText = '';
  }

}
