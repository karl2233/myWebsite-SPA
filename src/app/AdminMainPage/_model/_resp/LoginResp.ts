export class LoginResp{
    constructor(
        public statusReason:string,
        public statusCode:number,
        public userName:string,
        public token:string
    ){}
  }
  