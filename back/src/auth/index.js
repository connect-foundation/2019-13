import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  (req, res, next) => {
    if (!req.user) return res.json({ result: false });
    console.log(req.user);
    const token = jwt.sign(req.user,process.env.JWT_SECRET,{
      expiresIn : 1000 * 60 * 30
    })
    res.json({ 
      result: true, 
      token: token});
  }
);


export default router;
