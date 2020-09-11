import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketAPIService } from '../_services/web-socket-api.service';

@Component({
  selector: 'app-AdminPage',
  templateUrl: './AdminPage.component.html',
  styleUrls: ['./AdminPage.component.css']
})
export class AdminPageComponent implements OnInit {

  public isCollapsed = true;

  constructor(private router: Router,private webSocketAPI:WebSocketAPIService) { }

  ngOnInit() {
    this.webSocketAPI._connect();
  }
  sendNotification(){
    this.router.navigate(['/admin/sendnotification']);
  }

  listNotification(){
    this.router.navigate(['/admin/listnotification']);
  }

}
