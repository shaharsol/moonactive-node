import { Request, Response, Router } from "express";
import githubAuth from '../middlewares/github-auth'

const githubRouter = Router()

githubRouter.get('/connect', githubAuth.authenticate('github', { scope: [ 'user:email' ] }))

githubRouter.get('/callback', githubAuth.authenticate('github', { failureRedirect: '/guests/welcome' }), function(req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect('/users/dashboard');
})

export default githubRouter