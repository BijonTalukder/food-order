import { Model } from "mongoose"


export enum UserRole {
    USER = 'user',
    KITCHEN = 'kitchen',
    RIDER = 'rider',
  }
export type IUser ={
    id:string,
    name:string,
    role:UserRole,
    email:string,
    password:string,
    phone:string,

}

export type IUserModel = Model<IUser>