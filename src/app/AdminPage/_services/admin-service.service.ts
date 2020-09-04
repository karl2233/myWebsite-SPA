import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { SendNotificationReq } from '../_model/_req/SendNotificationReq';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NotificationElementResp } from '../_model/_resp/NotificationElementResp';
interface status{
  status: String;
}

interface notificationElement{
  notificationHeader:string;
  notificationBody:string;
  notificationId:number;
}

interface notificationElements{
  notificationElements:notificationElement[];
}
@Injectable({
  providedIn: 'root'
})


export class AdminServiceService {
  private _notifications = new BehaviorSubject<NotificationElementResp[]>([]);

  baseUrl = environment.apiUrl ;

  constructor(private http:HttpClient) { }
  
  
  get notifications() {
    return this._notifications.asObservable();
  }
  
  
  sendNotification(notificationHeader:string,notificationBody:string){
    let generatedId: string;
    const sendNotification = new SendNotificationReq(
      notificationHeader,
      notificationBody,
    );
    console.log("3");
    return this.http
    .post<status>(
      'http://localhost:8080/admin/SendNotification',
      { ...sendNotification,headers:this.getArgHeaders() }
    )
    .pipe(
      map(resData => {
       
        //return new SendNotificationResp(resData.status.statusCode,resData.status.statusReason);
      }),
      take(1),
      tap(bookings => {
  
      })
    ).subscribe({
      //next: data => this.postId = data.id,
      error: error => console.error('There was an error!', error)
  });
    }


  getListOfNotification(index:number){
    let params = new HttpParams();
    params = params.append('notificationId', index.toString());
    this.http.get<notificationElements>('http://localhost:8080/admin/notificationList', { headers: this.getArgHeaders(), params: params })
    .pipe(
      map(resData => {
        const arr = [];
    
       for(let i = 0; i < resData.notificationElements.length; i++){
         arr.push(new NotificationElementResp(resData.notificationElements[i].notificationHeader,resData.notificationElements[i].notificationBody,resData.notificationElements[i].notificationId)); 
        
        }
        const currentItems = this._notifications.getValue();
        this._notifications.next( currentItems.concat(arr));
        //return new SendNotificationResp(resData.status.statusCode,resData.status.statusReason);
      }),
      take(1),
      tap(bookings => {
        
       
        // for(let i = 0; i < bookings.length; i++){ 
        //   console.log(bookings[i]);
        //   }
      })
    ).subscribe({
      //next: data => this.postId = data.id,
      error: error => console.error('There was an error!', error)
  });
  }


  
  
    private getArgHeaders(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers':'Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        })
      };
    }
}
