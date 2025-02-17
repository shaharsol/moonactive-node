import passport from "passport";
import { Profile, Strategy } from 'passport-github2'
import config from 'config'
import getModel from "../models/users/factory";

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
})

passport.use(new Strategy(config.get('github'),
    async function(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
        try {
            // check if user exists in the database (login)
            let user = await getModel().login(profile.id)

            // if not, create user (signup)
            if(!user) {
                const githubId = profile.id
                const name = profile.displayName
                user = await getModel().signup({
                    githubId,
                    name
                })
            } 

            done(null, user)

        } catch (e) {
            done(e)
        }
    }
));

export default passport