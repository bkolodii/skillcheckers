import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {
hover:number = 1;
  constructor() { }

  ngOnInit(): void {
  }
  hoverCancel(status: boolean, person: number): void{
    if(status){
      this.hover = person
    }
    else{
      this.hover = null
    }
  }
}
