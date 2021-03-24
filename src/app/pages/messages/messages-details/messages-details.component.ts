import { Component, OnInit, ViewChild } from '@angular/core';
import { ScrollToBottomDirective } from 'src/app/shared/directive/scroll-to-bottom.directive';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.scss']
})
export class MessagesDetailsComponent implements OnInit {
  @ViewChild(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;
  constructor() { }

  ngOnInit(): void {
  }

}
