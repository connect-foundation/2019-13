import { prisma } from '../../../../../prisma-client';
import Utils from '../../../../utils/utils';


export default {
  Mutation: {
    updateComment: async (
      root,
      { commentId, text },
      context,
    ) => {
      try {
        const user = Utils.findUser(context.req);
        if (!user) return null;
        const owner = await prisma.comment({ id: commentId }).user();
        if (owner.id !== user.id) { return false; }
        await prisma.updateComment({
          data: {
            text,
          },
          where: {
            id: commentId,
          },
        });
        return true;
      } catch (e) {
        throw new Error('댓글 수정 오류 발생!');
      }
    },
  },
};
