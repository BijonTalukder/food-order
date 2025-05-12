import { Schema, model } from "mongoose";
import { IUser, IUserModel } from "./users.interface";

const UserSchena = new Schema<IUser>(
    {
        name:{
            type:String
        },
        email:{
            type:String,
            unique:true,
            required:true

        },
        phone:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        id:{
            type:String
        },
        role:{type:String}

    },{
        timestamps:true
    }
)
export const UserModel = model<IUser,IUserModel>("users",UserSchena)