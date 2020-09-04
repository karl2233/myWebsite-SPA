import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  jwtHelper = new JwtHelperService();

  constructor() { }

  loggedIn() {
    const token = localStorage.getItem('token');
    
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles):boolean{
    let isMatch = false;
    const userRoles = this.jwtHelper.decodeToken(localStorage.getItem('token')).role as Array<string>;
    allowedRoles.array.forEach(element => {
      if(userRoles.includes(element)){
        isMatch = true;
        return;
      }
    });
    return isMatch;
   // this.jwtHelper.isTokenExpired(localStorage.getItem('token'))
  }
}
