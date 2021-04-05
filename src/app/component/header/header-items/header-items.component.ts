import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-items',
  templateUrl: './header-items.component.html',
  styleUrls: ['./header-items.component.scss']
})
export class HeaderItemsComponent implements OnInit {
  dropWay = false
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('mainuser', JSON.stringify({
      icon : '../../../../assets/image/mainuser.png',
      username: 'Benny Spanbauer'
    }))
  }
  dropMenu(): void {
    this.dropWay = !this.dropWay
  }

}
