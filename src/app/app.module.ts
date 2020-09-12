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
import { ListItemsComponent } from './user-page/ListItems/ListItems.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
      MainPageComponent,
      MainPageRegisterComponent,
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
      ListItemsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
         tokenGetter,
         allowedDomains: ['localhost:8080'],
         disallowedRoutes: ['localhost:8080/register/*']
      }
    }),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmRegisteResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
