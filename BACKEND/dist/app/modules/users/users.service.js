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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const users_model_1 = require("./users.model");
const users_utility_1 = require("./users.utility");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, users_utility_1.generateUserId)();
    payload.id = id;
    const result = users_model_1.UserModel.create(payload);
    return result;
});
exports.UserService = { createUser };
