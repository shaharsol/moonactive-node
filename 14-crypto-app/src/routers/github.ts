import { Router } from "express";
import githubAuth from '../middlewares/github-auth'

const githubRouter = Router()

githubRouter.get('/connect', githubAuth.authenticate('github', { scope: [ 'user:email' ] }))

githubRouter.get('/callback', githubAuth.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/users/dashboard');
})

export default githubRouter