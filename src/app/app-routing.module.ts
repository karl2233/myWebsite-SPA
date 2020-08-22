import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './MainPage/MainPage.component';
import { MainPageLoginComponent } from './MainPage/MainPageLogin/MainPageLogin.component';
import { MainPageRegisterComponent } from './MainPage/MainPageRegister/MainPageRegister.component';
import { MainPageInfoComponent } from './MainPage/MainPageInfo/MainPageInfo.component';


const routes: Routes = [
  {path: '', component: MainPageComponent,
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
  { path: '**', redirectTo: '', pathMatch: 'full' }

  ]
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
