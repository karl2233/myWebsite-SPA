import { Component, Inject, OnInit } from '@angular/core';
import { NotificationElementResp } from '../_model/_resp/NotificationElementResp';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserServiceService } from '../_services/user-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LastIdResp } from '../_model/_resp/LastIdResp';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationComponentComponent } from '../notification-component/notification-component.component';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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
 listEmpty:boolean = false;

  constructor(private userServiceService: UserServiceService,private spinner: NgxSpinnerService,public dialog: MatDialog ,private router: Router,@Inject(DOCUMENT) private _document: Document) {

   }

  ngOnInit(): void {
    this.userServiceService.getListOfNotificationFirstCall(0)
    this.bookingSub =  this.userServiceService.notifications.subscribe( list=>{
      this.busyLoadingData = false;
      this.loading = true;
      const that = this;
      setTimeout(function(){
        that.loadedItems = list;
        that.loading = false;
        that.busyLoadingData = true;
         if(list.length == 0){
       that.listEmpty = false;
         }
      }, 2000);

      });
      this.lastSub = this.userServiceService.lastId.subscribe(lastItem=>{

        this.lastId = lastItem;
          });

      this.innerWidth = window.innerWidth;
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

        openDialog(header:string,body:string,id:number): void {
    
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.data = {header,body,id};
          dialogConfig.width = "370px";
          dialogConfig.height = "500px";

          const dialogRef = this.dialog.open(NotificationComponentComponent, dialogConfig);
   const that = this;
          dialogRef.afterClosed()
.subscribe(() => {
for(let i = 0; i < this.loadedItems.length; i++){ 
 if(that.loadedItems[i].notificationId == id){
  that.loadedItems[i].notificationCheck = true;
 }
  }
 
  });



        }


}
