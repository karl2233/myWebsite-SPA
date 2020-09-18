import { Component, OnInit, HostListener } from '@angular/core';
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
  public isToggleOpen = false;

  constructor(private webSocketAPI:WebSocketAPIService) { }

  ngOnInit(): void {
   this.webSocketAPI._connect();
  }

  onclick(){
  }

  
  @HostListener('document:click', ['$event.target'])
  onClick(btn) {
    if(this.isToggleOpen){
      this.isToggleOpen = false;
      this.isCollapsed = true;
    }

    if(!this.isCollapsed){
      this.isToggleOpen = true;
     console.log(this.isCollapsed);
    }
  
 }
 

}


