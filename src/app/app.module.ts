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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment.prod';
import { AutofocusDirective } from './shared/directive/auto-focus.directive';
import { InterviewsComponent } from './pages/interviews/interviews.component';
import { InterviewsItemComponent } from './pages/interviews/interviews-item/interviews-item.component';
import { UpcomingComponent } from './pages/interviews/interviews-item/upcoming/upcoming.component';
import { SortOrdersPipe } from './shared/pipe/sort-orders.pipe';
import { QuillModule } from 'ngx-quill';
import { CompletedComponent } from './pages/interviews/interviews-item/completed/completed.component';
import { UnconfirmedComponent } from './pages/interviews/interviews-item/unconfirmed/unconfirmed.component';
import { ClickOutsideModule } from 'ng-click-outside';
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
    AutofocusDirective,
    InterviewsComponent,
    InterviewsItemComponent,
    UpcomingComponent,
    SortOrdersPipe,
    CompletedComponent,
    UnconfirmedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
