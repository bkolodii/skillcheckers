import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header-items',
  templateUrl: './header-items.component.html',
  styleUrls: ['./header-items.component.scss']
})
export class HeaderItemsComponent implements OnInit {
  dropWay = false;
  currUser;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.updUser.subscribe(res => {
        this.currUser = res;
    })
    if (localStorage.getItem('mainuser')) {
      this.currUser = JSON.parse(localStorage.getItem('mainuser'));
    }
    // let n: number;
    // n = window.setTimeout(function () { localStorage.removeItem('mainuser')}, 600000);
  }
  dropMenu(): void {
    this.dropWay = !this.dropWay
  }
  navigateToNewOrder(): void {
    this.router.navigateByUrl('/home-page/orders/new-order')
    localStorage.removeItem('edit-order');
    let currentUrl = '/home-page/orders/new-order';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  onClickedOutsideItem(e: Event) {
    e.stopPropagation()
    this.dropWay = false;
  }
  signOUT(): void {
    this.authService.signOut()
  }
}
