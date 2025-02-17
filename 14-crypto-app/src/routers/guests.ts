import { Router } from "express";
import { welcome } from "../controllers/guests/controller";

const guestsRouter = Router()

guestsRouter.get('/welcome', welcome)

export default guestsRouter