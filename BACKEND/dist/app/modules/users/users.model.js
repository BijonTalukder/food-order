"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchena = new mongoose_1.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    role: { type: String }
}, {
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)("users", UserSchena);
