/* eslint-disable consistent-return */
import { prisma } from '../../../../prisma-client';
import utils from '../../../utils/utils';


export default {
  Query: {
    findProjectsByUserId: async (root, value, context) => {
      try {
        const user = utils.findUser(context.req);
        if (!user) throw new Error('Not Authorization');
        const projects = await prisma.projects({ where: { owner: { id: user.id } } });
        return projects;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
