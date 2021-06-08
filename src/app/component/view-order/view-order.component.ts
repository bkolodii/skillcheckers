import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit(): void {
  }
  openTab(j, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("order-type__item");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("txt-c-blue", "");
    tablinks[i].children[2].className = tablinks[i].children[2].className.replace("active-link bc-blue", "")
      
    }
    tablinks[j].children[2].className += "active-link bc-blue";
    console.log(document.querySelectorAll('.order-type__item')[j].children[2].className);
    tablinks[j].className += " " + "txt-c-blue";
    document.getElementById(tabName).style.display = "flex";

    
    // evt.target.className += " " + "txt-c-blue";
  }

}
