import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-SendNotification',
  templateUrl: './SendNotification.component.html',
  styleUrls: ['./SendNotification.component.css']
})
export class SendNotificationComponent implements OnInit {


  loginForm:FormGroup;

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
    }
  createRegisterForm(){

    this.loginForm = this.fb.group({
      title:new FormControl()
  })
}

  login(){
console.log(this.loginForm.value.title);
    }

}
