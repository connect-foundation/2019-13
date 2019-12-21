import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();
router.post(
  '/google',
  passport.authenticate('google-token', { session: false }),
  (req, res) => {
    if (!req.user) return res.json({ result: false });
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    return res.json({
      result: true,
      token,
    });
  },
);
router.post(
  '/facebook',
  passport.authenticate('facebook-token', { session: false }),
  (req, res) => {
    if (!req.user) return res.json({ result: false });
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    return res.json({
      result: true,
      token,
    });
  },
);

export default router;
