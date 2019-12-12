import { prisma } from '../../../prisma-client';

export default {
  Mutation: {
    addView: async (root, { projectId }) => {
      const views = await prisma.project({ id: projectId }).views();
      await prisma.updateProject(
        {
          data: {
            views: views + 1,
          },
          where: { id: projectId },
        },
      );
      return true;
    },
  },
};
