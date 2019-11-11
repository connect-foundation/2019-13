import { OAuth2Strategy as GoogleStrategy} from "passport-google-oauth";
import { Strategy as GoogleTokenStrategy} from 'passport-google-token'
export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },(accessToken,refreshToken, profile,done)=>{
        // console.log(profile);
        done(null, profile);
    })
  );
};
