import expree from "express";
import { cartController } from "./cart.controller";

const router = expree.Router();
router.post("/create",cartController.createCart)
router.get("/user/:id",cartController.getCartByUser)


export const CartRouter = router 