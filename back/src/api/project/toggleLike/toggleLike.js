import { prisma } from '../../../../prisma-client';
import Utils from '../../../utils/utils';

export default {
  Mutation: {
    toggleLike: async (root, { projectId }, context) => {
      const user = Utils.findUser(context.req);
      if (!user) return {};
      const filter = {
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            project: {
              id: projectId,
            },
          },
        ],
      };
      try {
        const alreadyLike = await prisma.$exists.like(filter);
        if (alreadyLike) {
          await prisma.deleteManyLikes(filter);
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id,
              },
            },
            project: {
              connect: {
                id: projectId,
              },
            },
          });
        }
      } catch (error) {
        console.error(error);
        return false;
      }
      return true;
    },
  },
};
