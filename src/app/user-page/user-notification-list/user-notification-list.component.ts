import { Component, OnInit } from '@angular/core';
import { NotificationElementResp } from '../_model/_resp/NotificationElementResp';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserServiceService } from '../_services/user-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LastIdResp } from '../_model/_resp/LastIdResp';

@Component({
  selector: 'app-user-notification-list',
  templateUrl: './user-notification-list.component.html',
  styleUrls: ['./user-notification-list.component.css']
})
export class UserNotificationListComponent implements OnInit {

  jwtHelper = new JwtHelperService();

  loadedItems:NotificationElementResp[];
 private bookingSub:Subscription;
 private lastId:LastIdResp[];
 private lastSub:Subscription;
 loading:boolean;
 public innerWidth: any;
 public index:number = 0;
 busyLoadingData:boolean = true;

  constructor(private userServiceService: UserServiceService,private spinner: NgxSpinnerService) {
    
   }

  ngOnInit(): void {
    this.userServiceService.getListOfNotification(0)
    this.bookingSub =  this.userServiceService.notifications.subscribe( list=>{
      this.busyLoadingData = false;
      this.loading = true;
      const that = this;
      console.log("hello");
      setTimeout(function(){      
        that.loadedItems = list;
        that.loading = false; 
        that.busyLoadingData = true;
      }, 2000);
     
      });
      this.lastSub = this.userServiceService.lastId.subscribe(lastItem=>{
  
        this.lastId = lastItem;        
          });
      
      this.innerWidth = window.innerWidth;
    
    
    //  console.log(this.loadedItems[this.loadedItems.length - 1]);
      // if(this.loadedItems[this.loadedItems.length - 1].notificationId == this.lastId[0].lastId ){
      //   console.log("karl");
      //   this.loading = false;
      // }
  }
  onScroll(){ 
    if(this.busyLoadingData){
      this.continue();
    }else{}
}
continue(){
  this.index = this.index + 15;
   this.userServiceService.getListOfNotification(this.index);
   
}


}
