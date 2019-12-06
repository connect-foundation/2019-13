import { prisma } from '../../../prisma-client';
import Utils from '../../utils/utils';

export default {
  Query: {
    projects: async (root, value, context) => {
      const user = Utils.findUser(context.req);
      if (!user) return {};
      const project = await prisma.projects();
      return project;
    },
    findProjectById: async (root, { projectId }, context) => {
      const user = Utils.findUser(context.req);
      try {
        const project = await prisma.project({
          id: projectId,
        });
        if (!project) return {};
        const blocks = await prisma.blocks({
          where: {
            project: {
              id: project.id,
            },
          },
        });
        if (!blocks) project.blocks = [];
        else project.blocks = blocks;
        if (project.private) {
          return project.owner.id === user.id ? project : {};
        }
        return project;
      } catch (e) {
        console.error(e);
        return {};
      }
    },
    findProjectsByUserId: async (root, value, context) => {
      try {
        const project = await prisma.project({
          id: projectId,
        });
        if (!project) return {};
        const blocks = await prisma.blocks({
          where: {
            project: {
              id: project.id,
            },
          },
        });
        if (!blocks) project.blocks = [];
        else project.blocks = blocks;
        if (project.private) {
          return project.owner.id === user.id ? project : {};
        }
        return project;
      } catch (e) {
        console.error(e);
        return {};
      }
    },
    findProjectsByUserId: async (root, value, context) => {
      try {
        const user = Utils.findUser(context.req);
        const query = `query {
                              projects(where:{
                                owner:{
                                  id : "${user.id}"
                                }
                              }){
                                id
                                title
                                description
                                like
                                owner {
                                  email
                                  picture
                                }
                              }
                            }`;
        const projects = await prisma.$graphql(query);
        return projects.projects;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  },
  Mutation: {
    createProjectAndBlocks: async (root, { projectTitle, input }, context) => {
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
    updateProjectAndBlocks: async (
      root,
      { projectId, projectTitle, input },
      context,
    ) => {
      const user = Utils.findUser(context.req);
      if (!user) return false;
      try {
        const project = await prisma.project({
          id: projectId,
        });
        const owner = await prisma.project({
          id: projectId,
        }).owner();
        if (owner.id !== user.id) return false;
        await prisma.updateProject({
          where: {
            id: project.id,
          },
          data: {
            title: projectTitle,
          },
        });
        if (!project) return false;
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
              inputElementId: {
                set: i.inputElementId,
              },
              project: {
                connect: {
                  id: project.id,
                },
              },
            },
            update: {
              type: i.type,
              positionX: i.positionX,
              positionY: i.positionY,
              nextElementId: i.nextElementId,
              firstChildElementId: i.firstChildElementId,
              secondChildElementId: i.secondChildElementId,
              inputElementId: {
                set: i.inputElementId,
              },
              project: {
                connect: {
                  id: project.id,
                },
              },
            },
          });
        });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    deleteProjectAndBlocks: async (root, { projectId }, context) => {
      const user = Utils.findUser(context.req);
      if (!user) return false;
      try {
        const owner = await prisma.project({
          id: projectId,
        }).owner();
        if (user.id !== owner.id) return false;

        await prisma.deleteManyBlocks({
          project: {
            id: projectId,
          },
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
