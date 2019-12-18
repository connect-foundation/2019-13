/* eslint-disable no-restricted-syntax */
import { prisma } from '../../../../prisma-client';
import utils from '../../../utils/utils';
import deleteFile from '../../../objectstorage/delete';

export default {
  Mutation: {
    deleteProjectAndBlocks: async (root, { projectId }, context) => {
      const user = utils.findUser(context.req);
      if (!user) return false;
      try {
        const isProject = await prisma.$exists.project({
          id: projectId,
        });
        if (!isProject) return true;
        const owner = await prisma
          .project({
            id: projectId,
          })
          .owner();
        if (user.id !== owner.id) return false;
        const workspaces = await prisma.project({
          id: projectId,
        }).workspaces();
        const workspaceIds = workspaces.map((workspace) => workspace.id);
        const images = await prisma.images({
          where: {
            workspace: {
              id_in: workspaceIds,
            },
          },
        });
        images.forEach(async (image) => {
          await deleteFile(image.realName);
        });
        await prisma.deleteProject({
          id: projectId,
        });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};
