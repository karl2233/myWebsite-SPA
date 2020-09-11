export class NotificationElementResp{
    constructor(
        public notificationHeader:string,
        public notificationBody:string,
        public notificationId:number,
        public notificationCheck:boolean,
        public index:number
    ){}
  }
  