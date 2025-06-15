import express,{ Application, Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import router from "./app/routes"
import bodyParser from 'body-parser'
const app:Application = express()
const port = 3000
app.use(cookieParser())
// app.use(cors())
app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true               // ✅ allow cookies
}));

//parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/api/v1/',router)
app.get("/",(req:Request,res:Response)=>{
    res.send("server ok")
})

export default app