import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { AdminServiceService } from '../_services/admin-service.service';
import { WebSocketAPIService } from 'src/app/_services/web-socket-api.service';

@Component({
  selector: 'app-SendNotification',
  templateUrl: './SendNotification.component.html',
  styleUrls: ['./SendNotification.component.css']
})
export class SendNotificationComponent implements OnInit {


  Notification:FormGroup;

  constructor(private fb:FormBuilder,private adminService:AdminServiceService,private webSocketAPI:WebSocketAPIService) {}

  ngOnInit() {
    this.createRegisterForm();
    }
  createRegisterForm(){

    this.Notification = this.fb.group({
      notificationTitle:new FormControl(),
      notificationBody:new FormControl()
  })
}

  sendNotification(){
this.adminService.sendNotification(this.Notification.value.notificationTitle,this.Notification.value.notificationBody).subscribe((data)=>{
  console.log(data.status);
  error: error => console.error('There was an error!', error)
});
this.webSocketAPI._send("daisy");
    }

}
