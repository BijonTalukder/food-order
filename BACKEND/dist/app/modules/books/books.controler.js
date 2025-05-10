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
exports.BooksController = void 0;
const books_service_1 = require("./books.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const CreateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { booksData } = req.body;
        console.log(booksData);
        const result = yield books_service_1.BookService.createBook(booksData);
        res.status(200).json({
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: 'book created successfully!',
            data: result,
        });
    }
    catch (e) {
    }
});
exports.BooksController = { CreateBook };
