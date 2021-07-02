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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from './shared/const/myformat';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewOrderComponent } from './component/view-order/view-order.component';

import { ToastrModule } from 'ngx-toastr';
import { CandidatesInflowComponent } from './component/view-order/candidates-inflow/candidates-inflow.component';
import { SavedComponent } from './component/view-order/saved/saved.component';
import { InterviewedComponent } from './component/view-order/interviewed/interviewed.component';
import { OfferedComponent } from './component/view-order/offered/offered.component';
import { HiredComponent } from './component/view-order/hired/hired.component';

import { CommonModule } from '@angular/common';
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
    UnconfirmedComponent,
    LoginComponent,
    HomePageComponent,
    ViewOrderComponent,
    CandidatesInflowComponent,
    SavedComponent,
    InterviewedComponent,
    OfferedComponent,
    HiredComponent,
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
    ClickOutsideModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    CommonModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
