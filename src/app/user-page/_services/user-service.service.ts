import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { NotificationElementResp } from '../_model/_resp/NotificationElementResp';
import { take } from 'rxjs/internal/operators/take';
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { NotificationListReq } from '../_model/_req/NotificationListReq';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LastIdResp } from '../_model/_resp/LastIdResp';
import { ItemCart } from '../_model/_resp/ItemCart';
import { CheckoutReq } from '../_model/_req/CheckoutReq';

interface notificationCheck{
  status : number;
}

interface notificationElement{
  notificationCheck:boolean;
  notificationHeader:string;
  notificationBody:string;
  notificationId:number;
}

interface notificationElements{
  lastId:number,
  list:notificationElement[];
}

interface listItem{
  list:Item[];
}

interface Item{
  projectId : number;
  projectName :string;
  projectPayed:boolean;
  projectPrice:number;
}

interface checkoutStatus{
  status:checkoutStatusElements;
}

interface checkoutStatusElements{
  checkoutStatusReason:string,
  chekcoutStatus:boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl = environment.apiUrl + 'user' ;

  private _notifications = new BehaviorSubject<NotificationElementResp[]>([]);
  private _lastId = new BehaviorSubject<LastIdResp[]>([]);
  private _items = new BehaviorSubject<Item[]>([]);

  jwtHelper = new JwtHelperService();

  get items() {
    return this._items.asObservable();
  }

  get notifications() {
    return this._notifications.asObservable();
  }

  get lastId() {
    return this._lastId.asObservable();
  }

  constructor(private http:HttpClient) { }

  getListOfNotification(index:number){
    const notificationElementReq = new NotificationListReq(this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,index);

    this.http.post<notificationElements>(this.baseUrl+'/getusernotificationlist', { ...notificationElementReq, headers: this.getArgHeaders()})
    .pipe(
      map(resData => {
        const arr = [];
        const lastId = [];

        if(resData.list.length == 0 ){
        }

         for(let i = 0; i < resData.list.length; i++){
          arr.push(new NotificationElementResp(resData.list[i].notificationHeader,resData.list[i].notificationBody,resData.list[i].notificationId,resData.list[i].notificationCheck,resData.lastId));
         }

         lastId.push(new LastIdResp(resData.lastId));

         const currentItems = this._notifications.getValue();
         this._notifications.next( currentItems.concat(arr));
         this._lastId.next(lastId);
      }),
      take(1),
      tap(bookings => {
      })
    ).subscribe({
      error: error => console.error('There was an error!', error)
  });
  }

  getListOfNotificationFirstCall(index:number){
    const notificationElementReq = new NotificationListReq(this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,index);

    this.http.post<notificationElements>(this.baseUrl+'/getusernotificationlist', { ...notificationElementReq, headers: this.getArgHeaders()})
    .pipe(
      map(resData => {
        const arr = [];
        const lastId = [];

        if(resData.list.length == 0 ){
        }

         for(let i = 0; i < resData.list.length; i++){
          arr.push(new NotificationElementResp(resData.list[i].notificationHeader,resData.list[i].notificationBody,resData.list[i].notificationId,resData.list[i].notificationCheck,resData.lastId));
         }

         lastId.push(new LastIdResp(resData.lastId));

        // const currentItems = this._notifications.getValue();
         this._notifications.next( arr);
         this._lastId.next(lastId);
      }),
      take(1),
      tap(bookings => {
      })
    ).subscribe({
      error: error => console.error('There was an error!', error)
  });
  }


  getListItem(){
    this.http.post<listItem>(this.baseUrl+'/getUserCheckoutList', { observe: 'response',headers: this.getArgHeaders()})
    .pipe(
      map(resData => {
        const arr = [];
        const lastId = [];
         for(let i = 0; i < resData.list.length; i++){
          arr.push(new ItemCart(resData.list[i].projectId,resData.list[i].projectName,resData.list[i].projectPayed,resData.list[i].projectPrice));
         }

         
        //  lastId.push(new LastIdResp(resData.lastId));
         
          //const currentItems = this._items.getValue();
          this._items.next(arr);
        //  this._lastId.next(lastId);
      }),
      take(1),
      tap(bookings => {
      })
    ).subscribe({
      error: error => console.error('There was an error!', error)
  });
  }

    checkout(amount:number,token:string,projectId:number){
      const checkoutReq  = new CheckoutReq(amount,token,projectId);
    //checkoutStatus
    return this.http.post<checkoutStatus>(this.baseUrl+'/checkout', {...checkoutReq, observe: 'response',headers: this.getArgHeaders()})
    .pipe(
      map(resData => {
        return resData;
      }),
      take(1),
      tap(bookings => {
      })
    ).subscribe(resData =>{
    });
        
      }

      checkNotification(notificationId){
        // let params = new HttpParams();
        // params = params.append('_page', 1);
        // params = params.append('_limit', 10);
        return this.http.get<notificationCheck>(this.baseUrl+"/notification/"+notificationId)
        .pipe(
          map(resData => {
            return resData
          }),
          take(1),
          tap(bookings => {
          })
        );
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
