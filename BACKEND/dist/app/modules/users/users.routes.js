"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const users_controler_1 = require("./users.controler");
const router = express_1.default.Router();
router.post("/create", users_controler_1.UserController.createUser);
exports.UserRoute = router;
