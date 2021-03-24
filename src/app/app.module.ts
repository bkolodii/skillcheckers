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
import { NewOrderComponent } from './component/new-order/new-order.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component';
import { ActiveComponent } from './pages/orders/order-items/active/active.component';
import { CloseComponent } from './pages/orders/order-items/close/close.component';
import { DraftsComponent } from './pages/orders/order-items/drafts/drafts.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MessagesDetailsComponent } from './pages/messages/messages-details/messages-details.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

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

    NewOrderComponent,
    OrderItemsComponent,
    CloseComponent,
    DraftsComponent,
    MessagesComponent,
    MessagesDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
