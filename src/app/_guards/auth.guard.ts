import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthServiceService } from '../_guards/auth-service.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router, private alertify: AlertifyService) {}

  canActivate(next:ActivatedRouteSnapshot): boolean {

const roles = next.firstChild.data['roles'] as Array<String>;
if(roles){
    const match = this.authService.roleMatch(roles);
    if(match){
        return true;
    }else{
        this.router.navigate(['/']);
    }
}

if (this.authService.loggedIn()) {
      
      return true;
    }
   
    this.alertify.error('You shall not pass!!!');
    this.router.navigate(['/']);
    return false;
  }
}