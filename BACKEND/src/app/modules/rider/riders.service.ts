
import { IUser, UserRole } from "../users/users.interface";
import { UserModel } from "../users/users.model";
import { generateUserId } from "../users/users.utility";


const createRider = async (payload:IUser)=>{
    console.log(payload);
    
    const id = await generateUserId();
    payload.id = id;
    payload.role = UserRole.RIDER;
      const result = UserModel.create(payload);
      return result;
}

export const RiderService = { createRider };
