"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRouter = void 0;
const express_1 = __importDefault(require("express"));
const stores_controller_1 = require("./stores.controller");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const router = express_1.default.Router();
router.post("/create", fileUploadHelper_1.fileUploadHelper.upload.single('file'), stores_controller_1.storeController.createStore);
router.get("/", stores_controller_1.storeController.getStore);
router.get("/:id", stores_controller_1.storeController.getSingleStore);
exports.storeRouter = router;
