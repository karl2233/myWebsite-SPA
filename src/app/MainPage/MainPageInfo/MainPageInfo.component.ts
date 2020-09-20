import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-MainPageInfo',
  templateUrl: './MainPageInfo.component.html',
  styleUrls: ['./MainPageInfo.component.css']
})
export class MainPageInfoComponent implements OnInit {

  loading:boolean =true ;
  theHtmlString:String;

  constructor() { }

  ngOnInit() {
    AOS.init();

    const that = this;
    setTimeout(function(){
      that.loading = false;
       }
    , 2000);
  }

}
