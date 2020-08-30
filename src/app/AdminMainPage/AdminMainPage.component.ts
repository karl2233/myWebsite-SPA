import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminregisterService } from './_services/adminregister.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-AdminMainPage',
  templateUrl: './AdminMainPage.component.html',
  styleUrls: ['./AdminMainPage.component.css']
})
export class AdminMainPageComponent implements OnInit {

  @Input() valuesFromHome:any;
  @Output() cancelRegister = new EventEmitter();
  loginForm:FormGroup;
  model:any = {};
  emailPattern ="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  constructor(private adminregisterService:AdminregisterService,private fb:FormBuilder,private alertify: AlertifyService) {}

  ngOnInit() {
    this.createRegisterForm();
    }
  createRegisterForm(){

    this.loginForm = this.fb.group({
      email:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),

      password:new FormControl('',[Validators.required,Validators.pattern(this.passwordPattern)])
  })
}
  login(){
    if(this.loginForm.valid){
        this.adminregisterService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe((data)=>{
 if(data.statusCode==0){

   this.alertify.warning(data.statusReason);
 }
 else{
  localStorage.setItem('token',data.token);
   this.alertify.success(data.statusReason);
 }
      }),error=>{

       }
    }else{
    }
    }
  cancel(){
    this.cancelRegister.emit(false);
  }

}
