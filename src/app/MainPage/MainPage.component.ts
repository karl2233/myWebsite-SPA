import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-MainPage',
  templateUrl: './MainPage.component.html',
  styleUrls: ['./MainPage.component.css']
})
export class MainPageComponent implements OnInit {
  public isCollapsed = true;
  public isToggleOpen = false;


  constructor() { }

  ngOnInit() {
  }


  home(){

  }


  @HostListener('document:click', ['$event.target'])
  onClick(btn) {
    if(this.isToggleOpen){
      this.isToggleOpen = false;
      this.isCollapsed = true;
    }

    if(!this.isCollapsed){
      this.isToggleOpen = true;
     console.log(this.isCollapsed);
    }
  
 }


 toggle = true;
status = 'Enable'; 

enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
}


}
