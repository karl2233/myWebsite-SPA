import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './MainPage/MainPage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageRegisterComponent } from './MainPage/MainPageRegister/MainPageRegister.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmRegisterComponent } from './ConfirmRegister/confirm-register/confirm-register.component';
import { ConfirmRegisteResolver } from './ConfirmRegister/_resolvers/confirmregister-resolver';
import { MainPageLoginComponent } from './MainPage/MainPageLogin/MainPageLogin.component';

@NgModule({
  declarations: [
    AppComponent,
      MainPageComponent,
      MainPageRegisterComponent,
      ConfirmRegisterComponent,
      MainPageLoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [ConfirmRegisteResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
