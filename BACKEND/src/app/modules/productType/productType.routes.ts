import  express  from "express"
import { productTypeController } from "./productType.controller";
import multer from 'multer'
import { fileUploadHelper } from "../../../helpers/fileUploadHelper";

const router = express.Router();
router.post("/create",fileUploadHelper.upload.single('file'),productTypeController.createProductType)
router.get("/", productTypeController.getProductType);

router.get("/:id",productTypeController.getSingleProdutType)
router.patch("/:id",productTypeController.updateProductType)
router.get("/get-productType-store/:id",productTypeController.getProductTypeStore)

export const productTypeRouter = router