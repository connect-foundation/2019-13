import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

const context = (req) => ({
  ...req,
});
const allTypes = fileLoader(path.join(__dirname, 'api/graphql/*.graphql'));
const allResolvers = fileLoader(path.join(__dirname, 'api/resolvers/*.js'));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
  context,
});

export default schema;
