import { Router, urlencoded } from "express";
import { addSymbol, dashboard } from "../controllers/users/controller";

const userRouter = Router()

userRouter.get('/dashboard', dashboard)
userRouter.post('/add-symbol', urlencoded({extended: false}), addSymbol)

export default userRouter