import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './MainPage/MainPage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageRegisterComponent } from './MainPage/MainPageRegister/MainPageRegister.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmRegisterComponent } from './ConfirmRegister/confirm-register/confirm-register.component';
import { ConfirmRegisteResolver } from './ConfirmRegister/_resolvers/confirmregister-resolver';
import { MainPageLoginComponent } from './MainPage/MainPageLogin/MainPageLogin.component';
import { AdminMainPageComponent } from './AdminMainPage/AdminMainPage.component';
import { AdminPageComponent } from './AdminPage/AdminPage.component';
import { SendNotificationComponent } from './AdminPage/SendNotification/SendNotification.component';
import { ListNotificationComponent } from './AdminPage/list-notification/list-notification.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserPageComponent } from './user-page/user-page.component';
import { UserNotificationListComponent } from './user-page/user-notification-list/user-notification-list.component';
import { UserMainPageComponent } from './user-page/user-main-page/user-main-page.component';
import { AddProjectComponent } from './AdminPage/add-project/add-project.component';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutFormComponent } from './user-page/checkout-form/checkout-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { CommonModule } from '@angular/common';
import { MainPageInfoComponent } from './MainPage/MainPageInfo/MainPageInfo.component';
import { ListItemsComponent } from './user-page/list-items/list-items.component';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';



export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
      MainPageComponent,
      MainPageRegisterComponent,
      MainPageInfoComponent,
      ConfirmRegisterComponent,
      MainPageLoginComponent,
      AdminMainPageComponent,
      AdminPageComponent,
      SendNotificationComponent,
      ListNotificationComponent,
      UserPageComponent,
      UserNotificationListComponent,
      UserMainPageComponent,
      AddProjectComponent,

      CheckoutFormComponent,

      ListItemsComponent
   ],
   
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    JwtModule.forRoot({
      config: {
         tokenGetter,
         allowedDomains: ['localhost:8080'],
         disallowedRoutes: ['localhost:8080/register/*']
      }
    }),
    BrowserAnimationsModule,
    NgbModule,
      NgxStripeModule.forRoot('pk_test_U57aiiGgGAayOhW1zazWZzuf00tFaJKJ6n')

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmRegisteResolver ,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
