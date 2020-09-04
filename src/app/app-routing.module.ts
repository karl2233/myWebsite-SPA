import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './MainPage/MainPage.component';
import { MainPageLoginComponent } from './MainPage/MainPageLogin/MainPageLogin.component';
import { MainPageRegisterComponent } from './MainPage/MainPageRegister/MainPageRegister.component';
import { MainPageInfoComponent } from './MainPage/MainPageInfo/MainPageInfo.component';
import { ConfirmRegisterComponent } from './ConfirmRegister/confirm-register/confirm-register.component';
import { ConfirmRegisteResolver } from './ConfirmRegister/_resolvers/confirmregister-resolver';
import { AdminMainPageComponent } from './AdminMainPage/AdminMainPage.component';
import { AdminPageComponent } from './AdminPage/AdminPage.component';
import { SendNotificationComponent } from './AdminPage/SendNotification/SendNotification.component';
import { ListNotificationComponent } from './AdminPage/list-notification/list-notification.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserNotificationListComponent } from './user-page/user-notification-list/user-notification-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserMainPageComponent } from './user-page/user-main-page/user-main-page.component';



const routes: Routes = [
  {
  path: '', component: MainPageComponent,
  children:[
    {
      path : '',
      component: MainPageInfoComponent,
      },
  {
   path : 'login',
   component: MainPageLoginComponent,
   },
   {
    path : 'subscribe',
    component: MainPageRegisterComponent,
    },
  ]
},
{
path:'access',
runGuardsAndResolvers:'always',
canActivate:[AuthGuard],
component:UserPageComponent,
children:[
  {
path:'',
component:UserMainPageComponent
  },
  {
    path : 'notificationlist',
    component: UserNotificationListComponent,
    }
]
},

{
  path: 'confirmregister/:token',
  component: ConfirmRegisterComponent,
  resolve: { registerstatus: ConfirmRegisteResolver }
 },
 {
  path: 'adminlogin',
  component: AdminMainPageComponent
 },

 {
  path: 'admin',
  runGuardsAndResolvers:'always',
 canActivate:[AuthGuard],
  component: AdminPageComponent,
  data:{roles:['ADMIN']},
  children:[
    {
      path : 'sendnotification',
      component: SendNotificationComponent,
    },
    {
      path:'listnotification',
      component:ListNotificationComponent
    }
  ]

 },

  { path: '**', redirectTo: '', pathMatch: 'full' }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
