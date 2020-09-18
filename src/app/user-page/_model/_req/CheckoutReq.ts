export class CheckoutReq{
    constructor(
        public amount:number,
        public token:string,
        public projectId:number
    ){}
  }
  