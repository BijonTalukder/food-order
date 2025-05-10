import { UserModel } from "./users.model";

export const findLastUserId = async () => {
  const lastUser = await UserModel.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0");
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  return incrementId;
};
