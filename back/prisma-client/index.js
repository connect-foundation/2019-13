
Object.defineProperty(exports, '__esModule', { value: true });
const prismaClientLib = require('prisma-client-lib');
const { typeDefs } = require('./prisma-schema');

const models = [
  {
    name: 'User',
    embedded: false,
  },
  {
    name: 'project',
    embedded: false,
  },
  {
    name: 'project_auth',
    embedded: false,
  },
  {
    name: 'block',
    embedded: false,
  },
  {
    name: 'block_category',
    embedded: false,
  },
  {
    name: 'block_type',
    embedded: false,
  },
];
exports.Prisma = prismaClientLib.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: process.env.PRISMA_URL,
  secret: process.env.PRISMA_SECRET,
});
exports.prisma = new exports.Prisma();
