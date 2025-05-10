"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoute = void 0;
const express_1 = __importDefault(require("express"));
const books_controler_1 = require("./books.controler");
const router = express_1.default.Router();
router.post('/create-books', books_controler_1.BooksController.CreateBook);
exports.BooksRoute = router;
