import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveComponent } from './pages/orders/active/active.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: 'orders', component: OrdersComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '' },
      { path: 'active', component: ActiveComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
