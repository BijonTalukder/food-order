"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeRouter = void 0;
const express_1 = __importDefault(require("express"));
const productType_controller_1 = require("./productType.controller");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const router = express_1.default.Router();
router.post("/create", fileUploadHelper_1.fileUploadHelper.upload.single('file'), productType_controller_1.productTypeController.createProductType);
router.get("/", productType_controller_1.productTypeController.getProductType);
router.get("/:id", productType_controller_1.productTypeController.getSingleProdutType);
router.patch("/:id", productType_controller_1.productTypeController.updateProductType);
router.get("/get-productType-store/:id", productType_controller_1.productTypeController.getProductTypeStore);
exports.productTypeRouter = router;
