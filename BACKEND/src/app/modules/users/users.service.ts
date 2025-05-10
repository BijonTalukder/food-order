import { IUser } from "./users.interface";
import { UserModel } from "./users.model";
import { generateUserId } from "./users.utility";

const createUser = async (payload: IUser) => {
  const id = await generateUserId();
  payload.id = id;
  const result = UserModel.create(payload);
  return result;
};
export const UserService = { createUser };
