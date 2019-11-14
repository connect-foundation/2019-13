"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "project",
    embedded: false
  },
  {
    name: "project_auth",
    embedded: false
  },
  {
    name: "block",
    embedded: false
  },
  {
    name: "block_category",
    embedded: false
  },
  {
    name: "block_type",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: process.env.PRISMA_URL
});
exports.prisma = new exports.Prisma();
