import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StripeService } from 'ngx-stripe';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserServiceService } from '../_services/user-service.service';

type NewType = NotificationComponentComponent;

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification-component.component.html',
  styleUrls: ['./notification-component.component.css']
})
export class NotificationComponentComponent implements OnInit {

elements:any;

  constructor(public dialogRef: MatDialogRef<NewType>,
    private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertify: AlertifyService,
    private userService: UserServiceService) { }

  ngOnInit() {
    this.elements = this.data;

  }

}
