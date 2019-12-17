import { prisma } from '../../../prisma-client';
import Utils from '../../utils/utils';
import Upload from '../../objectstorage/upload';
import Delete from '../../objectstorage/delete';

export default {
  Query: {
    projects: async (root, value, context) => {
      const project = await prisma.projects({
        where: { private: false },
        orderBy: 'views_DESC',
        first: 10,
      });
      return project;
    },
    findProjectById: async (root, { projectId }, context) => {
      const user = Utils.findUser(context.req);
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
      }
    },
    findProjectsByUserId: async (root, value, context) => {
      try {
        const user = Utils.findUser(context.req);
        if (!user) throw new Error('Not Authorization');
        const projects = await prisma.projects({ where: { owner: { id: user.id } } });
        return projects;
      } catch (e) {
        console.error(e);
      }
    },
  },
  Mutation: {
    createProjectAndBlocks: async (
      root,
      { projectTitle, workspacesInput },
      context,
    ) => {
      try {
        const user = Utils.findUser(context.req);
        if (!user) throw new Error('Not Authorization');
        const project = await prisma.createProject({
          title: projectTitle,
          description: '',
          views: 0,
          private: false,
          owner: {
            connect: {
              id: user.id,
            },
          },
        });
        workspacesInput.forEach(async (workspace) => {
          await prisma.createWorkspace({
            id: workspace.id,
            project: {
              connect: {
                id: project.id,
              },
            },
          });
          workspace.blocks.forEach(async (blockData) => {
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
              workspace: {
                connect: {
                  id: workspace.id,
                },
              },
            });
          });
          const { image } = workspace;
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
            workspace: {
              connect: {
                id: workspace.id,
              },
            },
          });
        });

        return project.id;
      } catch (e) {
        console.error(e);
      }
    },
    updateProjectAndBlocks: async (
      root,
      {
        projectId, projectTitle, workspacesInput,
      },
      context,
    ) => {
      const user = Utils.findUser(context.req);
      if (!user) return false;
      try {
        const project = await prisma.project({
          id: projectId,
        });
        if (!project) return false;
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
        const notFoundWorkspace = [];
        const prevWorkspaces = await prisma.project({
          id: projectId,
        }).workspaces();
        prevWorkspaces.forEach((workspace) => {
          let found = false;
          workspacesInput.forEach((prev) => {
            if (prev.id === workspace.id) {
              found = true;
            }
          });
          if (!found) notFoundWorkspace.push(workspace.id);
        });
        await prisma.deleteManyWorkspaces({
          id_in: notFoundWorkspace,
        });
        workspacesInput.forEach(async (workspace) => {
          await prisma.upsertWorkspace({
            where: {
              id: workspace.id,
            },
            create: {
              id: workspace.id,
              project: {
                connect: {
                  id: project.id,
                },
              },
            },
            update: {
              project: {
                connect: {
                  id: project.id,
                },
              },
            },
          });
        });
        const workspaceIds = workspacesInput.map((workspace) => workspace.id);
        const prevImages = await prisma.images({
          where: {
            id_in: workspaceIds,
          },
        });
        const prevBlocks = await prisma.blocks({
          where: {
            id_in: workspaceIds,
          },
        });


        const allInput = workspacesInput.reduce((prev, workspace) => {
          const { image, blocks } = workspace;
          prev[0].push({ ...image, workspaceId: workspace.id });
          prev[1].concat(blocks.map((block) => ({ ...block, workspaceId: workspace.id })));
          return prev;
        }, [[], []]);
        const [images, blocks] = allInput;


        const notFoundBlock = [];
        prevBlocks.forEach((prev) => {
          let found = false;
          blocks.forEach(async (block) => {
            if (block.id === prev.id) {
              found = true;
            }
          });
          if (!found) notFoundBlock.push(prev.id);
        });
        await prisma.deleteManyBlocks({
          id_in: [...notFoundBlock],
        });
        blocks.forEach(async (i) => {
          await prisma.upsertBlock({
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
              workspace: {
                connect: {
                  id: i.workspaceId,
                },
              },
            },
          });
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
              workspace: {
                connect: {
                  id: image.workspaceId,
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
          await Delete(image.realName);
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
