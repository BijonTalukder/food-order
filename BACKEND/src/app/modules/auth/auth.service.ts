import ApiError from "../../errors/ApiError";
import { UserModel } from "../users/users.model";
import { ILogInUser } from "./auth.interface";
import httpsStatus from "http-status-codes";
import jwt from "jsonwebtoken";
interface UserWithStore {
  _id: string;
  email: string;
  password: string;
  role: string;
  store: any[]; // Update this based on your 'store' schema
}
const LogIn = async (payload: ILogInUser) => {
  const { email, password } = payload;

  const isEmailExist = await UserModel.exists({ email });
  const isPasswordExist = await UserModel.exists({ password });

  if (!isEmailExist) {
    throw new ApiError(httpsStatus.NOT_FOUND, "email not found");
  }
  if (!isPasswordExist) {
    throw new ApiError(httpsStatus.NOT_FOUND, "password not found");
  }
  const userExist:UserWithStore[] = await UserModel.aggregate([
    {
      $match:{
        email: email,
        password: password,
      }
    },
    {
      $lookup:{
        from:'stores',
        localField:'_id',
        foreignField:'userId',
        as:'store'
      }
    }
  ])
  


  if (userExist) {
    const payload = { email: userExist[0].email, role: userExist[0].role };
    const jwtToken = jwt.sign(payload, "very-secret", { expiresIn: "365d" });
    return {
      status: httpsStatus.OK,
      user: {
        id: userExist[0]?._id,
        email: userExist[0]?.email,
        storeId:userExist[0]?.store[0]?._id|| null
      },
      token: jwtToken

    };
  }

};
export const AuthService = { LogIn };
