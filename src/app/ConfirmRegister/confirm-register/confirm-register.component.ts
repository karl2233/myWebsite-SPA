import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {

  statusReason:String;
  errorCode:Boolean;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   
    this.route.data.subscribe(data => {
   
      
this.statusReason = data['registerstatus']['status']['statusReason'];
if(data['registerstatus']['status']['statusCode']){
this.errorCode=true;
}else{
  this.errorCode=false;
}
      
    });
  console.log(this.errorCode);
  }

}
