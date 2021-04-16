import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-items',
  templateUrl: './header-items.component.html',
  styleUrls: ['./header-items.component.scss']
})
export class HeaderItemsComponent implements OnInit {
  dropWay = false
  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('mainuser', JSON.stringify({
      icon: '../../../../assets/image/mainuser.png',
      username: 'Benny Spanbauer'
    }))
  }
  dropMenu(): void {
    this.dropWay = !this.dropWay
  }
  navigateToNewOrder(): void {
    this.router.navigateByUrl('/orders/new-order')
    localStorage.removeItem('edit-order');
    let currentUrl = '/orders/new-order';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  onClickedOutsideItem(e: Event) {
    e.stopPropagation()
      this.dropWay = false;
  }
}
