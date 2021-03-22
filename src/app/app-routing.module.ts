import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './component/new-order/new-order.component';
import { MessagesDetailsComponent } from './pages/messages/messages-details/messages-details.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ActiveComponent } from './pages/orders/order-items/active/active.component';
// import { ActiveComponent } from './pages/orders/active/active.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: 'orders', component: OrdersComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'order-items/active' },
      { path: 'order-items', component: OrderItemsComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: '' },
        { path: 'active', component: ActiveComponent},
      ] },
      { path: 'new-order', component: NewOrderComponent },
    ]
  },
  {path: 'messages', component: MessagesComponent, children : [
    { path: ':url', component: MessagesDetailsComponent }, 
  ]},
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
