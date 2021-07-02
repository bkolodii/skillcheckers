import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequiredSkillsService } from 'src/app/service/required-skills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequiredSkills } from 'src/app/shared/interfaces/requiredSkill.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  currId: string = '';
  currOrder: RequiredSkills;
  constructor(public location: Location,
    private ref: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private requiredSkills: RequiredSkillsService,
    private toastr: ToastrService) {
    this.router.events.subscribe(res => {
      if (res.hasOwnProperty('routerEvent')) {
        this.ngOnInit();
      }
    })
  }

  ngOnInit(): void {
    this.currId = this.activatedRoute.snapshot.paramMap.get('id');
    this.requiredSkills.getOne(this.currId).onSnapshot(
      document => {
        document.forEach(skills => {
          const order = {
            id: skills.id,
            ...skills.data() as RequiredSkills
          };
          this.currOrder = order;
          this.ref.detectChanges();
        });
      }
    );
  }
  openTab(j, tabName) {
    // var i, tabcontent, tablinks;
    // tabcontent = document.getElementsByClassName("tabcontent");
    // for (i = 0; i < tabcontent.length; i++) {
    //   tabcontent[i].style.display = "none";
    // }
    // tablinks = document.getElementsByClassName("order-type__item");
    // for (i = 0; i < tablinks.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace("txt-c-blue", "");
    //   tablinks[i].children[2].className = tablinks[i].children[2].className.replace("active-link bc-blue", "")
    // }
    // tablinks[j].children[2].className += "active-link bc-blue";
    // tablinks[j].className += " " + "txt-c-blue";
    // document.getElementById(tabName).style.display = "flex";
  }

  closeOrder(): void {
    this.requiredSkills.delete(this.currId).then(
      () => {
        console.log('success');
        this.toastr.success(`You delete the order`, 'Deleting success');
        this.returnBack();
      }
    )
  }

  editCurrOrder(): void {
    localStorage.setItem('edit-order', JSON.stringify(this.currOrder))
    this.router.navigateByUrl('home-page/orders/new-order');
  }

  returnBack(): void {
    this.router.navigateByUrl('home-page/orders/order-items/active');
  }
}
