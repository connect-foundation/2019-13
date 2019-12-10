import { prisma } from '../../../prisma-client';
import Utils from '../../utils/utils';
import Upload from '../../objectstorage/upload';
import Delete from '../../objectstorage/delete';

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
        if (!project) return null;
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
    findProjectsByUserId: async (root, value, context) => {
      try {
        const user = Utils.findUser(context.req);
        if (!user) return [];
        const projects = await prisma.projects({ where: { owner: { id: user.id } } });
        return projects;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  },
  Mutation: {
    createProjectAndBlocks: async (
      root,
      { projectTitle, input, images },
      context,
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
        images.forEach(async (image) => {
          let url;
          let realName;
          if (image.file) {
            const {
              filename, createReadStream,
            } = await image.file;
            realName = new Date().getTime() + project.id + filename;
            const storageResult = await Upload(createReadStream, realName);
            url = storageResult.Location;
          } else {
            url = image.url;
            realName = image.url;
          }
          await prisma.createImage({
            url,
            name: image.name,
            realName,
            positionX: image.x,
            positionY: image.y,
            size: image.size,
            direction: image.direction,
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
      {
        projectId, projectTitle, input, images,
      },
      context,
    ) => {
      const user = Utils.findUser(context.req);
      if (!user) return false;
      try {
        const project = await prisma.project({
          id: projectId,
        });
        const owner = await prisma
          .project({
            id: projectId,
          })
          .owner();
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
        const prevImages = await prisma.images({
          where: {
            project: {
              id: project.id,
            },
          },
        });
        const imageSet = new Set();
        images.forEach((image) => {
          if (!image.id) return;
          prevImages.forEach((prevImage) => {
            if (image.id === prevImage.id) {
              imageSet.add(prevImage.id);
            }
          });
        });

        prevImages.forEach(async (prevImage) => {
          if (!(imageSet.has(prevImage.id))) {
            await Delete(prevImage.realName);
            await prisma.deleteImage({
              id: prevImage.id,
            });
          }
        });

        images.forEach(async (image) => {
          let {
            id, positionX, positionY, size, direction, name, realName, url, file,
          } = image;
          if (file) {
            const {
              filename, createReadStream,
            } = await file;
            realName = new Date().getTime() + project.id + filename;
            const resultStorage = await Upload(createReadStream, realName);
            url = resultStorage.Location;
          }
          await prisma.upsertImage({
            where: {
              id,
            },
            update: {
              positionX,
              positionY,
              size,
              direction,
              name,
            },
            create: {
              id,
              positionX,
              positionY,
              size,
              direction,
              name,
              url,
              realName,
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

        await prisma.deleteManyBlocks({
          project: {
            id: projectId,
          },
        });

        await prisma.deleteManyLikes({
          project: {
            id: projectId,
          },
        });
        const images = await prisma.images({
          where: {
            project: {
              id: projectId,
            },
          },
        });
        images.forEach(async (image) => {
          await Delete(image.realName);
        });
        await prisma.deleteManyImages({
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
