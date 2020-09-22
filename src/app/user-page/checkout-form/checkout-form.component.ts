import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserServiceService } from '../_services/user-service.service';
import { Router } from '@angular/router';

type NewType = CheckoutFormComponent;

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: 'black',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '15px',
        '::placeholder': {
          color: 'black'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewType>,
    private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertify: AlertifyService,
    private userService: UserServiceService
    ,private router: Router) {
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
    
  }

  createToken(): void {
  const that = this;

    this.stripeService
      .createToken(this.card.element)
      .subscribe((result) => {
        if (result.token) {
         const token = result.token;
          this.userService.checkout(this.data.price,token.id,this.data.index);
        } else if (result.error) {
          this.alertify.error("Something went wrong");
        }
      });
  }

}
