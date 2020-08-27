import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';


import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmRegisterResp } from '../_model/_resp/ConfirmRegisterResp';
import { ConfirmRegisterService } from '../_services/confirmregisterservice.service';


@Injectable()
export class ConfirmRegisteResolver implements Resolve<ConfirmRegisterResp> {
  constructor(
    private confirmRegisterService: ConfirmRegisterService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ConfirmRegisterResp> {
   
      return this.confirmRegisterService.confirmRegister(route.params['token']).pipe(
        catchError(error => {
                 this.router.navigate(['/']);
                 return of(null);
               })
       );
    
  }
}