import { Router, urlencoded } from "express";
import { addSymbol, dashboard } from "../controllers/users/controller";
import { addSymbolValidator } from "../controllers/users/validator";
import validateBody from "../middlewares/validate-body";
import enforeAuth from "../middlewares/enforce-auth";

const userRouter = Router()

userRouter.use(enforeAuth)

userRouter.get('/dashboard', dashboard)
userRouter.post('/add-symbol', urlencoded({extended: false}), validateBody(addSymbolValidator) , addSymbol)

export default userRouter