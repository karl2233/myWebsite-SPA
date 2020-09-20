import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../_services/user-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ItemCart } from '../_model/_resp/ItemCart';

import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  private ItemsSub:Subscription;
  Items:ItemCart[];

  constructor(private userService:UserServiceService,public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getListItem();
    this.ItemsSub = this.userService.items.subscribe(list=>{

this.Items = list;
    })
  }

  getItems(){
this.userService.getListItem();
  }

  openDialog(index:number,price:number): void {

  const dialogRef = this.dialog.open(CheckoutFormComponent, {
   width:"500px",
   height:"130px",
   data:{index,price}
    });
}

}
