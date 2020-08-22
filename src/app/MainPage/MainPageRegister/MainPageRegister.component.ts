import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RegisterserviceService } from '../_services/registerservice.service';



@Component({
  selector: 'app-MainPageRegister',
  templateUrl: './MainPageRegister.component.html',
  styleUrls: ['./MainPageRegister.component.css']
})
export class MainPageRegisterComponent implements OnInit {


  @Input() valuesFromHome:any;
  @Output() cancelRegister = new EventEmitter();
  registerForm:FormGroup;
  model:any = {};
  emailPattern ="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  constructor(private registerService:RegisterserviceService,private fb:FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
    }
  createRegisterForm(){
    this.registerForm = this.fb.group({
      email:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      username:new FormControl('',Validators.required),
      password:new FormControl('',[Validators.required,Validators.pattern(this.passwordPattern)]),
      confirmPassword:new FormControl('',Validators.required)
    },{validator :this.passwordMatchValidator});
  }
  register(){
   if(this.registerForm.valid){
       this.registerService.addRegister(this.registerForm.value.email,this.registerForm.value.password,this.registerForm.value.confirmPassword,this.registerForm.value.username).subscribe((data)=>{

     }),error=>{

      }
   }else{

   }
   }
  cancel(){
    this.cancelRegister.emit(false);
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch':true};
  }

}
