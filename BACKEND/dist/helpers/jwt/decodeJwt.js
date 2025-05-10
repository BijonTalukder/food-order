"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const decode = (token, secret) => {
    try {
        const data = jsonwebtoken_1.default.verify(token, secret);
        return data;
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};
exports.JwtHelper = { decode };
