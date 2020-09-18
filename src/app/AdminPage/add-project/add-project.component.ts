import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AdminServiceService } from '../_services/admin-service.service';
import { WebSocketAPIService } from 'src/app/_services/web-socket-api.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  Notification:FormGroup;

  constructor(private fb:FormBuilder,private adminService:AdminServiceService,private webSocketAPI:WebSocketAPIService) {}

  ngOnInit() {
    this.createRegisterForm();
    }
  createRegisterForm(){

    this.Notification = this.fb.group({
      projectName:new FormControl(),
      userName:new FormControl(),
      projectPrice:new FormControl()
  })
}

sendProject(){
 this.adminService.sendProjectToUser(this.Notification.value.userName,this.Notification.value.projectName,this.Notification.value.projectPrice).subscribe((data)=>{
  // console.log(data.status);
   error: error => console.error('There was an error!', error)
 });
//this.webSocketAPI._send("daisy");
    }
}
