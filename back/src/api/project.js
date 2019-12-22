import { prisma } from '../../prisma-client';
import utils from '../utils/utils';

export default {
  project: {
    owner: ({ id }) => prisma.project({ id }).owner(),
    comments: ({ id }) => prisma.project({ id }).comments({ orderBy: 'createdAt_DESC' }),
    workspaces: ({ id }) => prisma.project({ id }).workspaces(),
    isLiked: async (root, value, context) => {
      const { id } = root;
      const user = utils.findUser(context.req);
      if (!user) return false;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            project: {
              id,
            },
          },
        ],
      });
    },
    likeCount: (parent) => prisma.likesConnection({
      where: { project: { id: parent.id } },
    })
      .aggregate()
      .count(),
    commentCount: (parent) => prisma.commentsConnection({
      where: { project: { id: parent.id } },
    })
      .aggregate()
      .count(),
  },
};
