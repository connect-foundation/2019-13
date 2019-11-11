import express from "express";
import passport from "passport";
const router = express.Router();

router.post(
  "/google",
  (req,res,next)=>{console.log(req.body);next();},
  passport.authenticate("google-token", {session : false}),(req,res,next)=>{
    res.json({result : true});
});
export default router;