import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequiredSkillsService } from 'src/app/service/required-skills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequiredSkills } from 'src/app/shared/interfaces/requiredSkill.interface';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  currId: string = '';
  currOrder: RequiredSkills;
  constructor(public location: Location, private router: Router, private activatedRoute: ActivatedRoute, private requiredSkills: RequiredSkillsService) { }

  ngOnInit(): void {
    this.currId = this.activatedRoute.snapshot.paramMap.get('id');
    this.requiredSkills.getOne(this.currId).onSnapshot(
      document => {
        document.forEach(prod => {
          const order = {
            id: prod.id,
            ...prod.data() as RequiredSkills
          };
          this.currOrder = order;
          console.log(this.currOrder);
          
        });
      }
    );
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
    tablinks[j].className += " " + "txt-c-blue";
    document.getElementById(tabName).style.display = "flex";
  }
  closeOrder(): void {
    this.requiredSkills.delete(this.currId).then(
      () => {
        console.log('success');

      }
    )
  }
  editCurrOrder(): void {
    localStorage.setItem('edit-order', JSON.stringify(this.currOrder))
    this.router.navigateByUrl('home-page/orders/new-order');
  }
}
