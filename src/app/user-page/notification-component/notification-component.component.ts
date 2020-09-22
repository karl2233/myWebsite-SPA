import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserServiceService } from '../_services/user-service.service';
import { Location} from '@angular/common';

type NewType = NotificationComponentComponent;

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification-component.component.html',
  styleUrls: ['./notification-component.component.css']
})
export class NotificationComponentComponent implements OnInit {

elements:any;

theHtmlString = 'Template  <b>Syntax</b>';

  constructor(public dialogRef: MatDialogRef<NewType>,
    private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertify: AlertifyService,
    private userService: UserServiceService,
    private router: Router,
    private _location:Location) { }

  ngOnInit() {
    this.userService.checkNotification(this.data.id).subscribe(data => {

    });
    this.elements = this.data;
    this.theHtmlString = this.data.body;
  }

  onNoClick(): void {
    this.dialogRef.close()
    //this.router.navigate([decodeURI(this._location.path())]);
   // this.dialogRef.close();
  }

}
