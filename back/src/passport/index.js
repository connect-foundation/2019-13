import { Strategy as GoogleTokenStrategy } from "passport-google-token";
import {prisma} from '../../prisma-client';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
export default passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },
      async (accessToken, refreshToken, profile, done) => {
        //인증되었을 경우
        const {id,email,name,picture} = profile._json;
        try{

          const user = await prisma.upsertUser({
            where : {
              id : `G-${id}`
            },
            create:{
              id : `G-${id}`,
              email,
              name,
              picture
            },
            update:{
              email,
              name,
              picture
            }
          })
       
          done(null, user);
        }catch(e){
          done(e);
        }
       
      }
    )
  );
  passport.use(new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
  },async (jwt_payload, done)=>{
    try{
      const user = await prisma.$exists.user({
        where : jwt_payload.id
      });
      if(user) return done({...user});
      else return done(null, false);
    }catch(e){
      return(e);
    }

  }))
};
