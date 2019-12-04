import { prisma } from '../../../prisma-client';

export default {
  Query: {
    projects: async (root, value, context) => {
      const user = Utils.findUser(context.req);
      if (!user) return null;
      const project = await prisma.projects();
      return project;
    },
    findProjectById: async (root, { projectId }, context) => {
      const user = Utils.findUser(context.req);
      const project = await prisma.project({
        id: projectId,
      });
      if (!project.blocks) project.blocks = [];
      if (project.private) {
        return project.owner.id === user.id ? project : null;
      }
      return project;
    },
    findProjectsByUserId: async (root, value, context) => {
      try {
        const user = Utils.findUser(context.req);
        const projects = await prisma.projects({
          where: {
            owner: {
              id: user.id,
            },
          },
        });
        return projects;
      } catch (e) {
        console.error(e);
        return false;
      }
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
        const user = Utils.findUser(context.req);
        if (!user) return 'false';
        const project = await prisma.createProject({
          title: projectTitle,
          description: '',
          like: 0,
          private: false,
          owner: {
            connect: {
              id: user.id,
            },
          },
        });
        input.forEach(async (blockData) => {
          await prisma.createBlock({
            id: blockData.id,
            type: blockData.type,
            positionX: blockData.positionX,
            positionY: blockData.positionY,
            nextElementId: blockData.nextElementId,
            firstChildElementId: blockData.firstChildElementId,
            secondChildElementId: blockData.secondChildElementId,
            inputElementId: {
              set: blockData.inputElementId,
            },
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
