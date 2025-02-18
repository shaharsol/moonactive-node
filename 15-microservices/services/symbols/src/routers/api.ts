import { Router } from "express";
import { getLatestValue } from "../controllers/api/controller";

const apiRouter = Router()
apiRouter.get('/latest-value/:symbol', getLatestValue)

export default apiRouter