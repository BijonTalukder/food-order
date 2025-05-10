import  express  from "express"
import { UserController } from "./users.controler"
const router = express.Router()
router.post("/create",UserController.createUser)
export const UserRoute = router