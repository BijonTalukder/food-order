"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const users_model_1 = require("../users/users.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LogIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isEmailExist = yield users_model_1.UserModel.exists({ email });
    // console.log(1)
    const isPasswordExist = yield users_model_1.UserModel.exists({ password });
    // console.log(isPasswordExist)
    if (!isEmailExist) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, "email not found");
    }
    if (!isPasswordExist) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, "password not found");
    }
    const userExist = yield users_model_1.UserModel.aggregate([
        {
            $match: {
                email: email,
                password: password,
            }
        },
        {
            $lookup: {
                from: 'stores',
                localField: '_id',
                foreignField: 'userId',
                as: 'store'
            }
        }
    ]);
    // findOne({
    //   email: email,
    //   password: password,
    // });
    console.log(userExist);
    if (userExist) {
        const payload = { email: userExist[0].email, role: userExist[0].role };
        const jwtToken = jsonwebtoken_1.default.sign(payload, "very-secret", { expiresIn: "365d" });
        return {
            status: http_status_codes_1.default.OK,
            user: {
                id: userExist[0]._id,
                email: userExist[0].email,
                storeId: userExist[0].store[0]._id || null
            },
            token: jwtToken
        };
    }
});
exports.AuthService = { LogIn };
