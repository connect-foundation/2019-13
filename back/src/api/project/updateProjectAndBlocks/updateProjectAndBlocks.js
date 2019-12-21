import utils from '../../../utils/utils';
import { prisma } from '../../../../prisma-client';
import deleteFile from '../../../objectstorage/delete';
import upload from '../../../objectstorage/upload';
/* eslint-disable no-restricted-syntax */

export default {
  Mutation: {
    updateProjectAndBlocks: async (
      root,
      {
        projectId, projectTitle, workspacesInput, images, canvasImage,
      },
      context,
    ) => {
      const user = utils.findUser(context.req);
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

        // const { filename, createReadStream } = await canvasImage;
        // const canvasImageName = `project-${new Date().getTime()}${filename}`;
        // const canvasImagePath = await upload(createReadStream, canvasImageName);

        await prisma.updateProject({
          where: {
            id: project.id,
          },
          data: {
            title: projectTitle,
            // canvasImage: canvasImagePath.Location,
            // realCanvasImage: canvasImageName,
          },
        });
        // deleteFile(project.realCanvasImage);
        const notFoundWorkspace = [];
        const prevWorkspaces = await prisma
          .project({
            id: projectId,
          })
          .workspaces();
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
        for await (const workspace of workspacesInput) {
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
        }
        const workspaceIds = workspacesInput.map((workspace) => workspace.id);
        const prevImages = await prisma.images({
          where: {
            workspace: {
              id_in: workspaceIds,
            },
          },
        });
        const prevBlocks = await prisma.blocks({
          where: {
            workspace: {
              id_in: workspaceIds,
            },
          },
        });

        const blocks = workspacesInput.reduce((prev, workspace) => {
          // eslint-disable-next-line max-len,no-param-reassign
          prev = prev.concat(
            workspace.blocks.map((block) => ({
              ...block,
              workspaceId: workspace.id,
            })),
          );
          return prev;
        }, []);

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
        for await (const i of blocks) {
          await prisma.upsertBlock({
            where: {
              id: i.id,
            },
            create: {
              id: i.id,
              type: i.type,
              x: i.x,
              y: i.y,
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
            update: {
              type: i.type,
              x: i.x,
              y: i.y,
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
        }
        const imageSet = new Set();
        images.forEach((image) => {
          if (!image.id) return;
          prevImages.forEach((prevImage) => {
            if (image.id === prevImage.id) {
              imageSet.add(prevImage.id);
            }
          });
        });
        for await (const prevImage of prevImages) {
          if (!imageSet.has(prevImage.id)) {
            await deleteFile(prevImage.realName);
            await prisma.deleteImage({
              id: prevImage.id,
            });
          }
        }

        for await (const image of images) {
          const {
            id,
            x,
            y,
            size,
            direction,
            name,
            file,
          } = image;
          let { realName, url } = image;
          if (file) {
            const { filename, createReadStream } = await file;
            realName = new Date().getTime() + project.id + filename;
            const resultStorage = await upload(createReadStream, realName);
            url = resultStorage.Location;
          }
          await prisma.upsertImage({
            where: {
              id,
            },
            update: {
              x,
              y,
              size,
              direction,
              name,
              workspace: {
                connect: {
                  id: image.workspaceId,
                },
              },
            },
            create: {
              id,
              x,
              y,
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
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};
