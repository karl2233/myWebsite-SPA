import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RegisterserviceService } from '../_services/registerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-MainPageLogin',
  templateUrl: './MainPageLogin.component.html',
  styleUrls: ['./MainPageLogin.component.css']
})
export class MainPageLoginComponent implements OnInit {

  loading:boolean =true;
  @Input() valuesFromHome:any;
  @Output() cancelRegister = new EventEmitter();
  loginForm:FormGroup;
  model:any = {};
  emailPattern ="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  constructor(private registerService:RegisterserviceService,private fb:FormBuilder,private alertify: AlertifyService,private router: Router) {}

  ngOnInit() {
    const that = this;
    setTimeout(function(){      
      that.loading = false;
       }
    , 2000);
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
        this.registerService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe((data)=>{
 if(data.statusCode==0){

   this.alertify.warning(data.statusReason);
 }
 else{
  localStorage.setItem('token',data.token);
   this.alertify.success(data.statusReason);
   this.router.navigate(['/access']);
   
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
