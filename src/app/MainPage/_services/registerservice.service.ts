import { Injectable } from '@angular/core';
import { RegisterReq } from '../_model/_req/RegisterReq';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {

  baseUrl = environment.apiUrl ;

constructor(private http:HttpClient) { }


addRegister(email:string,password:string,confirmPassword:string,username:string){

  let generatedId: string;
  const newRegReq = new RegisterReq(
  email,
  password,
  confirmPassword,
  username
  );
  return this.http
  .post<{ name: string }>(
    this.baseUrl+'register/addregister',
    { ...newRegReq,headers:this.getArgHeaders() }
  )
  .pipe(
    switchMap(resData => {
      generatedId = resData.name;
      return null;
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
