import { prisma } from '../../../../../prisma-client';
import Utils from '../../../../utils/utils';


export default {
  Mutation: {
    removeComment: async (
      root,
      { commentId },
      context,
    ) => {
      try {
        const user = Utils.findUser(context.req);
        if (!user) return false;
        const owner = await prisma.comment({ id: commentId }).user();
        if (owner.id !== user.id) return false;
        await prisma.deleteComment({ id: commentId });
        return true;
      } catch (e) {
        throw new Error('댓글 삭제 실패!');
      }
    },
  },
};
