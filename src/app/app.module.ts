import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HeaderItemsComponent } from './component/header/header-items/header-items.component';
import { MenuComponent } from './component/menu/menu.component';
import { MenuItemComponent } from './component/menu/menu-item/menu-item.component';
import { PremiumComponent } from './component/menu/premium/premium.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ActiveComponent } from './pages/orders/active/active.component';
import { DraftsComponent } from './pages/orders/drafts/drafts.component';
import { ClosedComponent } from './pages/orders/closed/closed.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderItemsComponent,
    MenuComponent,
    MenuItemComponent,
    PremiumComponent,
    OrdersComponent,
    ActiveComponent,
    DraftsComponent,
    ClosedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
