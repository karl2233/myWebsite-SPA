import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { SendNotificationReq } from '../_model/_req/SendNotificationReq';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NotificationElementResp } from '../_model/_resp/NotificationElementResp';
import { ProjectAddReq } from '../_model/_req/ProjectAddReq';
interface status{
  status: NotficationStatus;
}
interface NotficationStatus{
  notificationStatus:number;
  notificationStatusReason:string;
  lastInsertedNotificationId:number;
}

interface notificationElement{
  notificationHeader:string;
  notificationBody:string;
  notificationId:number;
}

interface notificationElements{
  notificationElements:notificationElement[];
}

interface successnotification{
  status:number;
}

interface projectAddSuccess{
  status:boolean
}
@Injectable({
  providedIn: 'root'
})


export class AdminServiceService {
  private _notifications = new BehaviorSubject<NotificationElementResp[]>([]);

  baseUrl = environment.apiUrl + 'admin' ;

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
    return this.http
    .post<successnotification>(
      'http://localhost:8080/admin/SendNotification',
      { ...sendNotification,headers:this.getArgHeaders() }
    )
    .pipe(
      map(resData => {
        return resData;
      })
    )
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
      }),
      take(1),
      tap(bookings => {
      })
    ).subscribe({
      error: error => console.error('There was an error!', error)
  });
  }


  sendProjectToUser(usernName:string,projectName:string,projectPrice:number){
    const projectAddRequest = new ProjectAddReq(
      projectName,
      projectPrice,
      usernName
    );

    return this.http
    .post<projectAddSuccess>(
      this.baseUrl+'/addProject',
      { ...projectAddRequest,headers:this.getArgHeaders() }
    )
    .pipe(
      map(resData => {
        console.log(resData.status);
      })
    )
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
