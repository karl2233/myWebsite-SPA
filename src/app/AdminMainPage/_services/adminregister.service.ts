import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterReq } from '../_model/_req/RegisterReq';
import { map, take, tap } from 'rxjs/operators';
import { RegisterResp } from '../_model/_resp/RegisterResp';
import { Registerstatus } from '../_model/_resp/Registerstatus';
import { LoginReq } from '../_model/_req/LoginReq';
import { LoginResp } from '../_model/_resp/LoginResp';
interface RespStatus {
  status: status;
}
interface status {
  statusReason: string;
  statusCode: number;
}
interface LoginRespStatus{
  status: LoginStatus;
}
interface LoginStatus{
  statusReason: string;
  statusCode: number;
  userName:string;
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminregisterService {

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

  login(email:string,password:string){

    let generatedId: string;
    const loginReq = new LoginReq(
    email,
    password,
    );
    return this.http
    .post<LoginRespStatus>(
      this.baseUrl+'register/adminsignin',
      { ...loginReq,headers:this.getArgHeaders() }
    )
    .pipe(
      map(resData => {
        return new LoginResp(resData.status.statusReason,resData.status.statusCode,resData.status.userName,resData.status.token);
      // return new RegisterResp(
      //     new Registerstatus(resData.status.statusReason, resData.status.statusCode)
      //   );

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
