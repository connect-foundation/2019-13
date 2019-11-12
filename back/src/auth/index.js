import express from "express";
import passport from "passport";
const router = express.Router();

router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  (req, res, next) => {
    if (!req.user) return res.json({ result: false });
    res.json({ result: true });
  }
);
export default router;
