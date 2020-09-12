import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../_services/user-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ItemCart } from '../_model/_resp/ItemCart';

@Component({
  selector: 'app-ListItems',
  templateUrl: './ListItems.component.html',
  styleUrls: ['./ListItems.component.css']
})
export class ListItemsComponent implements OnInit {

  private ItemsSub:Subscription;
  Items:ItemCart[];

  constructor(private userService:UserServiceService) { }

  ngOnInit() {
    this.userService.getListItem();
    this.ItemsSub = this.userService.items.subscribe(list=>{

this.Items = list;
    })
  }

  getItems(){
this.userService.getListItem();
  }

}
