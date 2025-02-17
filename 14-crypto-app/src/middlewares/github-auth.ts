import passport from "passport";
import { Profile, Strategy } from 'passport-github2'
import config from 'config'

passport.use(new Strategy(config.get('github'),
    function(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
        // check if user exists in the database (login)
        // if not, create user (signup)
    }
));

export default passport