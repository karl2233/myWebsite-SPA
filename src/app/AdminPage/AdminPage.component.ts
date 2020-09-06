import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-AdminPage',
  templateUrl: './AdminPage.component.html',
  styleUrls: ['./AdminPage.component.css']
})
export class AdminPageComponent implements OnInit {

  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  sendNotification(){
    this.router.navigate(['/admin/sendnotification']);
  }

  listNotification(){
    this.router.navigate(['/admin/listnotification']);
  }

}
