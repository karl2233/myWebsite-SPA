import { Component, OnInit, HostListener } from '@angular/core';
import { AdminServiceService } from '../_services/admin-service.service';
import { NotificationElementResp } from '../_model/_resp/NotificationElementResp';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {
  loadedItems:NotificationElementResp[];
 private bookingSub:Subscription;
 loading:boolean;
 public innerWidth: any;
  constructor(private adminServiceService: AdminServiceService,private spinner: NgxSpinnerService) {
    
   }

  ngOnInit(): void {
   this.loading= true;
   
    this.adminServiceService.getListOfNotification(0)
  this.bookingSub =  this.adminServiceService.notifications.subscribe(karl=>{
    this.loadedItems = karl;
  //  console.log(karl);
    });
    this.innerWidth = window.innerWidth;
    //this.adminServiceService.getListOfNotification(0);
  }


  onScroll(){
  console.log("worked");
  if(this.loadedItems[this.loadedItems.length - 1].notificationId == 1){
    this.loading = false;
    return true;
  }
  this.adminServiceService.getListOfNotification(this.loadedItems[this.loadedItems.length - 1].notificationId);
  console.log(this.loadedItems[this.loadedItems.length - 1]);
}

// @HostListener('window:resize', ['$event'])
// onResize(event) {
//   this.innerWidth = window.innerWidth;
//   console.log(this.innerWidth);
// }
}
