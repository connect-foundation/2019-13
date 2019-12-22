import { prisma } from '../../../../../prisma-client';
import Utils from '../../../../utils/utils';


export default {
  Mutation: {
    createComment: async (
      root,
      { projectId, text },
      context,
    ) => {
      try {
        const user = Utils.findUser(context.req);
        if (!user) return null;
        const comment = await prisma.createComment({
          text,
          project: {
            connect: {
              id: projectId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        });
        return comment;
      } catch (e) {
        throw new Error('댓글 생성 실패!');
      }
    },
  },
};
