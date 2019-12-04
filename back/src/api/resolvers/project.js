import { prisma } from '../../../prisma-client';

export default {
  Query: {
    projects: async () => {
      const project = await prisma.projects();
      return project;
    },
  },
  Mutation: {
    createProjectAndBlocks: async (
      root,
      { projectTitle, input },
      context,
      info,
    ) => {
      try {
        const { user } = context;
        //   if (!user) return 'false';
        console.log(user);
        const project = await prisma.createProject({
          title: projectTitle,
          description: '',
          like: 0,
          private: false,
          owner: {
            connect: {
            // id: user.id,
              id: 'ck3qns3z802zd0786o3oqt78k',
            },
          },
        });
        input.forEach(async (blockData) => {
          const block = await prisma.createBlock({
            id: blockData.id,
            type: blockData.type,
            positionX: blockData.positionX,
            positionY: blockData.positionY,
            nextElementId: blockData.nextElementId,
            firstChildElementId: blockData.firstChildElementId,
            secondChildElementId: blockData.secondChildElementId,
            inputElementId: blockData.inputElementId,
            project: {
              connect: {
                id: project.id,
              },
            },
          });
        });
        return project.id;
      } catch (e) {
        console.error(e);
        return 'false';
      }
    },
    updateProjectAndBlocks: async (root, { projectId, projectTitle, input }, context, info) => {
      const project = await prisma.updateProject({
        where: {
          id: projectId,
        },
        data: {
          title: projectTitle,
        },
      });
      const blocks = await prisma.blocks({
        where: {
          project: {
            id: projectId,
          },
        },
      });
      const notFoundBlock = [];
      blocks.forEach((block) => {
        let found = false;
        input.forEach(async (i) => {
          if (i.id === block.id) {
            found = true;
          }
        });
        if (!found) notFoundBlock.push(block.id);
      });
      console.log(notFoundBlock);
      await prisma.deleteManyBlocks({
        id_in: [...notFoundBlock],
      });
      input.forEach(async (i) => {
        const block = await prisma.upsertBlock({
          where: {
            id: i.id,
          },
          create: {
            id: i.id,
            type: i.type,
            positionX: i.positionX,
            positionY: i.positionY,
            nextElementId: i.nextElementId,
            firstChildElementId: i.firstChildElementId,
            secondChildElementId: i.secondChildElementId,
            inputElementId: i.inputElementId,
          },
          update: {
            type: i.type,
            positionX: i.positionX,
            positionY: i.positionY,
            nextElementId: i.nextElementId,
            firstChildElementId: i.firstChildElementId,
            secondChildElementId: i.secondChildElementId,
            inputElementId: i.inputElementId,
          },
        });
      });
      return true;
    },
  },
};
