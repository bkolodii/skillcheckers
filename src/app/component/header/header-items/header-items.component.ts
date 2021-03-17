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
  }
  dropMenu(): void {
    this.dropWay = !this.dropWay
  }

}
