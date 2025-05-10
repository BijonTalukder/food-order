import expree from "express";
import { productController } from "./product.controller";
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";
const router = expree.Router();
router.post("/create",fileUploadHelper.upload.single('file'),productController.createProduct)
router.get("/",productController.getProduct);
router.get("/get-product-by-store/:id",productController.getProductByStore)

export const ProductRouter = router 