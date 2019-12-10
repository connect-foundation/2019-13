import { prisma } from '../../../prisma-client';
import utils from '../../utils/utils';

export default {
  project: {
    owner: ({ id }) => prisma.project({ id }).owner(),
    blocks: ({ id }) => prisma.project({ id }).blocks(),
    images: ({ id }) => prisma.project({ id }).images(),
    isLiked: async (root, value, context) => {
      const { id } = root;
      const user = utils.findUser(context.req);
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
  },
};
