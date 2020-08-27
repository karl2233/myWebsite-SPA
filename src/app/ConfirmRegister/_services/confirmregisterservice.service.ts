

import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Observable } from 'rxjs';
import { ConfirmRegisterResp } from '../_model/_resp/ConfirmRegisterResp';
import { ConfirmRegisterStatus } from '../_model/_resp/ConfirmRegisterStatus';

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
export class ConfirmRegisterService {

  baseUrl = environment.apiUrl +'register/' ;
  

constructor(private http:HttpClient,private alertify: AlertifyService) { }




  confirmRegister( token?,
   
    ): Observable<ConfirmRegisterResp> {

    let params = new HttpParams();

    params = params.append('token', token);

    

    return this.http.get<RespStatus>(this.baseUrl+ 'activateRegister',{ observe: 'response', params:params,headers: this.getArgHeaders()})
.pipe(
  map(response => {
   return new ConfirmRegisterResp(new ConfirmRegisterStatus(response.body.status.statusReason,response.body.status.statusCode));
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