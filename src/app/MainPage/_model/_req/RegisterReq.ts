export class RegisterReq{
  constructor(
      public email:string,
      public password:string,
      public confirmPassword:string,
      public username:string,
  ){}
}
