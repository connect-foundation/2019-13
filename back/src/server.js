import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import passport from 'passport';
import cors from 'cors';
import express from 'express';
import schema from './schema';
import authRouter from './auth';
import passportConfig from './passport';

const PORT = process.env.PORT || 4000;
const context = ({ request, response }) => ({ req: request, res: response });
const server = new GraphQLServer({ schema, context });
const corsOptions = {
  origin: true,
  method: 'GET, POST',
  credietials: true,
};
server.express.use(express.json());
server.express.use(cors(corsOptions));
server.express.use(logger('dev'));
server.express.use(passport.initialize());
passportConfig(passport);
server.express.use((req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization === 'Bearer undefined') return next();
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log(user);
    if (!user) {
      next(new Error('Not Authorization'));
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
});
server.express.use('/auth', authRouter);
server.start({ port: PORT, debug: false }, () => console.log(`Server is running on port ${PORT}!`));

server.express.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).json({
    result: err.message,
  });
});
