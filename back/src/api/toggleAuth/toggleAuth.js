import { prisma } from '../../../prisma-client';
import Utils from '../../utils/utils';

export default {
  Mutation: {
    toggleAuth: async (root, { projectId }, context) => {
      const user = Utils.findUser(context.req);
      if (!user) return {};
      try {
        const project = await prisma.project({ id: projectId });
        await prisma.updateProject({
          data: {
            private: !project.private,
          },
          where: {
            id: projectId,
          },
        });
      } catch (error) {
        console.error(error);
        return false;
      }
      return true;
    },
  },
};
