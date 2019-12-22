import { prisma } from '../../../../../prisma-client';
import utils from '../../../../utils/utils';

export default {
  Query: {
    findProjectById: async (root, { projectId }, context) => {
      const user = utils.findUser(context.req);
      try {
        const project = await prisma.project({
          id: projectId,
        });
        if (!project) throw new Error('Not Found Project');
        if (project.private) {
          const owner = await prisma.project({ id: projectId }).owner();
          return (user && owner.id === user.id) ? project : null;
        }
        return project;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
  },
};
