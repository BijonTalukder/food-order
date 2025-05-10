"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksModel = void 0;
const mongoose_1 = require("mongoose");
const BooksSchema = new mongoose_1.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    publicationDate: {
        type: Date
    }
}, {
    timestamps: true
});
exports.BooksModel = (0, mongoose_1.model)("Books", BooksSchema);
