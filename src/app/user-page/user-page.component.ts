import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public isCollapsed = true;
  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/greetings";
  private stompClient = null;


  constructor() { }

  ngOnInit(): void {
   // this.connect();
  }

  onclick(){
    this.connectToWebsocketWithStomp();  }
  connectToWebsocketWithStomp() {
    const socket = new SockJS('http://localhost:8080/onlyfullstack-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function(frame) {
      //_this.showUserNameForm(true);
      console.log('Connected: ' + frame);

    //   _this.stompClient.subscribe('/topic/hi', function(hello) {
    //  //   _this.showGreeting(JSON.parse(hello.body).greeting);
    //   });
    });
  }

  private getArgHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':'Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',

      })
    };
  }

}


