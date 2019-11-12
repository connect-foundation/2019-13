import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import passport from 'passport';
import authRouter from './auth'
import passportConfig from './passport';
import cors from'cors';
import express from 'express';
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });
const corsOptions = {
  origin : true,
  method : 'GET, POST',
  credietials : true,
  
}
server.express.use(express.json());
server.express.use(cors(corsOptions))
server.express.use(logger('dev'));
server.express.use(passport.initialize());
passportConfig(passport);
server.express.use('/auth',authRouter);

server.start({ port: PORT }, () =>
  console.log(`Server is running on port ${PORT}!`)
);
