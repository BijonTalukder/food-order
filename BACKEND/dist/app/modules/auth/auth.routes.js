"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controler_1 = require("./auth.controler");
const router = express_1.default.Router();
router.post("/login", auth_controler_1.AuthController.LogInUser);
exports.AuthRouter = router;
