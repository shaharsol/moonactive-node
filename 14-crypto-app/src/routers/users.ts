import { Router } from "express";
import { addSymbol, dashboard } from "../controllers/users/controller";

const userRouter = Router()

userRouter.get('/dashboard', dashboard)
userRouter.post('/add-symbol', addSymbol)

export default userRouter