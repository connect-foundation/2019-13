import { prisma } from '../../../../../prisma-client';

export default {
  Query: {
    projects: async () => {
      const project = await prisma.projects({
        where: { private: false },
        orderBy: 'views_DESC',
        first: 10,
      });
      return project;
    },
  },
};
