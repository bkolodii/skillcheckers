import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './component/new-order/new-order.component';
import { CandidatesInflowComponent } from './component/view-order/candidates-inflow/candidates-inflow.component';
import { HiredComponent } from './component/view-order/hired/hired.component';
import { InterviewedComponent } from './component/view-order/interviewed/interviewed.component';
import { OfferedComponent } from './component/view-order/offered/offered.component';
import { SavedComponent } from './component/view-order/saved/saved.component';
import { ViewOrderComponent } from './component/view-order/view-order.component';
import { IsLoginGuard } from './guards/is-login.guard';
import { HomePageComponent } from './home-page/home-page.component';
// import { IsLoginGuard } from './guards/is-login.guard';
import { LoginComponent } from './login/login.component';
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
  { path: '', pathMatch: 'full', redirectTo: 'home-page' },

  {
    path: 'home-page', component: HomePageComponent, canActivate: [IsLoginGuard], children: [
      {
        path: 'orders', component: OrdersComponent, canActivate: [IsLoginGuard], children: [
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
          {
            path: ':id', component: ViewOrderComponent, children: [
              { path: 'candidates-inflow', component: CandidatesInflowComponent },
              { path: 'saved', component: SavedComponent },
              { path: 'interviewed', component: InterviewedComponent },
              { path: 'offered', component: OfferedComponent },
              { path: 'hired', component: HiredComponent },
              { path: '', pathMatch: 'full', redirectTo: 'candidates-inflow' },
            ]
          },
        ]
      },
      {
        path: 'interviews', component: InterviewsComponent, canActivate: [IsLoginGuard], children: [
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
        path: 'messages', component: MessagesComponent, canActivate: [IsLoginGuard], children: [
          { path: ':url', component: MessagesDetailsComponent },
          // { path: '', pathMatch: 'full', redirectTo: 'Albert_Flores' },
        ]
      },
    ]
  },
  { path: 'login', component: LoginComponent, canLoad: [IsLoginGuard] },
  { path: '**', component: LoginComponent },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
