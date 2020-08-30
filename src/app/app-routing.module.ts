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
  component: AdminPageComponent,
  children:[
    {
      path : 'sendnotification',
      component: SendNotificationComponent,
    }
  ]

 },
//  {
//   path: 'admin',
//   component: AdminPageComponent,
//   children:[
//     {
//       path : 'sendnotification',
//       component: SendingNotificationComponent,
//       }
//   ]

//  },
  { path: '**', redirectTo: '', pathMatch: 'full' }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
