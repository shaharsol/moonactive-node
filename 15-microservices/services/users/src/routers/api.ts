import { Router } from "express";
import { getDistinctSymbols } from "../controllers/api/controller";

const apiRouter = Router()

apiRouter.get('/distinct-symbols', getDistinctSymbols)

export default apiRouter