import { Injectable } from '@angular/core';
import { RegisterReq } from '../_model/_req/RegisterReq';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterResp } from '../_model/_resp/RegisterResp';
import { Registerstatus } from '../_model/_resp/Registerstatus';
import { Observable } from 'rxjs';

interface RespStatus {
  status: status;
}
interface status {
  statusReason: string;
  statusCode: number;
}

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
  console.log(newRegReq.email);
  return this.http
  .post<RespStatus>(
    this.baseUrl+'register/addregister',
    { ...newRegReq,headers:this.getArgHeaders() }
  )
  .pipe(
    map(resData => {
    return new RegisterResp(
        new Registerstatus(resData.status.statusReason, resData.status.statusCode)
      );
    
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
