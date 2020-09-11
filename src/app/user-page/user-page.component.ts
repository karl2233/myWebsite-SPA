import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpHeaders } from '@angular/common/http';
import { WebSocketAPI } from '../_services/websocketapi';
import { WebSocketAPIService } from '../_services/web-socket-api.service';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public isCollapsed = true;


  constructor(private webSocketAPI:WebSocketAPIService) { }

  ngOnInit(): void {
   this.webSocketAPI._connect();
  }

  onclick(){
  }

 

}


