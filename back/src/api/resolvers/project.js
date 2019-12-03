import { prisma } from '../../../prisma-client';

export default {
  Query: {
    projects: async () => {
      const project = await prisma.projects();
      return project;
    },
  },
  Mutation: {
    createProjectAndBlocks: async (root, { project_name, input }, context, info) => 1,
  },
};
