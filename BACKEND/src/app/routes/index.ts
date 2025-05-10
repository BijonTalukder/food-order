import express from 'express'
import { BooksRoute } from '../modules/books/books.routes'
import { UserRoute } from '../modules/users/users.routes'
import { AuthRouter } from '../modules/auth/auth.routes'
import { productTypeRouter } from '../modules/productType/productType.routes'
import { storeRouter } from '../modules/stores/stores.routes'
import { ProductRouter } from '../modules/product/product.routes'
import { CartRouter } from '../modules/cart/cart.routes'
import { orderRouter } from '../modules/orders/order.route'
import { paymentController } from '../modules/payment/payment.controller'
const router = express.Router()
router.use('/books',BooksRoute)
router.use('/user',UserRoute)
router.use('/auth',AuthRouter)
router.use('/productType',productTypeRouter)
router.use('/stores',storeRouter)
router.use("/product",ProductRouter)
router.use("/cart",CartRouter)
router.use("/order",orderRouter)

router.post("/success", paymentController.handlePaymentSuccess);


// Fail route - handles failed payment attempts and updates the order status
// router.post('/fail', paymentController.handlePaymentFail);

// Cancel route - handles cancelled payment attempts and updates the order status
// router.post('/cancel', paymentController.handlePaymentCancel);


export default router