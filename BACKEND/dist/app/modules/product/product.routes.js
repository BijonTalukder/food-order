"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const router = express_1.default.Router();
router.post("/create", fileUploadHelper_1.fileUploadHelper.upload.single('file'), product_controller_1.productController.createProduct);
router.get("/", product_controller_1.productController.getProduct);
router.get("/get-product-by-store/:id", product_controller_1.productController.getProductByStore);
exports.ProductRouter = router;
