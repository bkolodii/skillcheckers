import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './component/new-order/new-order.component';
import { CompletedComponent } from './pages/interviews/interviews-item/completed/completed.component';
import { InterviewsItemComponent } from './pages/interviews/interviews-item/interviews-item.component';
import { UnconfirmedComponent } from './pages/interviews/interviews-item/unconfirmed/unconfirmed.component';
import { UpcomingComponent } from './pages/interviews/interviews-item/upcoming/upcoming.component';
import { InterviewsComponent } from './pages/interviews/interviews.component';
import { MessagesDetailsComponent } from './pages/messages/messages-details/messages-details.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ActiveComponent } from './pages/orders/order-items/active/active.component';
import { CloseComponent } from './pages/orders/order-items/close/close.component';
import { DraftsComponent } from './pages/orders/order-items/drafts/drafts.component';
// import { ActiveComponent } from './pages/orders/active/active.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: 'orders', component: OrdersComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'order-items/active' },
      {
        path: 'order-items', component: OrderItemsComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: '' },
          { path: 'active', component: ActiveComponent },
          { path: 'drafts', component: DraftsComponent },
          { path: 'closed', component: CloseComponent },
        ]
      },
      { path: 'new-order', component: NewOrderComponent },
    ]
  },
  {
    path: 'interviews', component: InterviewsComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'interviews-item/upcoming' },
      {
        path: 'interviews-item', component: InterviewsItemComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: '' },
          { path: 'upcoming', component: UpcomingComponent },
          { path: 'completed', component: CompletedComponent },
          { path: 'unconfirmed', component: UnconfirmedComponent },
        ]
      },
      { path: 'new-order', component: NewOrderComponent },
    ]
  },
  {
    path: 'messages', component: MessagesComponent, children: [
      { path: ':url', component: MessagesDetailsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'Albert_Flores' },
    ]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
