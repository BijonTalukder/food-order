import  express  from "express"
import { RiderController } from "./riders.controller"
const riderRouter = express.Router()

riderRouter.post("/create",RiderController.createRider) 

export default riderRouter