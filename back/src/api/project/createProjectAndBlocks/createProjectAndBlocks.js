/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
import { prisma } from '../../../../prisma-client';
import utils from '../../../utils/utils';
import upload from '../../../objectstorage/upload';


export default {
  Mutation: {
    createProjectAndBlocks: async (
      root,
      {
        projectTitle, workspacesInput, images, canvasImage,
      },
      context,
    ) => {
      try {
        const user = utils.findUser(context.req);
        if (!user) throw new Error('Not Authorization');
        const { filename, createReadStream } = await canvasImage;
        const canvasFileName = `project-${new Date().getTime()}${filename}`;
        const canvasImagePath = await upload(createReadStream, canvasFileName);

        const project = await prisma.createProject({
          title: projectTitle,
          description: '',
          views: 0,
          private: false,
          canvasImage: canvasImagePath.Location,
          realCanvasImage: canvasFileName,
          owner: {
            connect: {
              id: user.id,
            },
          },
        });


        for await (const workspace of workspacesInput) {
          await prisma.createWorkspace({
            id: workspace.id,
            project: {
              connect: {
                id: project.id,
              },
            },
          });
          for await (const blockData of workspace.blocks) {
            await prisma.createBlock({
              id: blockData.id,
              type: blockData.type,
              x: blockData.x,
              y: blockData.y,
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
          }
        }
        for await (const image of images) {
          let url;
          let realName;
          if (image.file) {
            const { filename, createReadStream } = await image.file;
            realName = new Date().getTime() + project.id + filename;
            const storageResult = await upload(createReadStream, realName);
            url = storageResult.Location;
          } else {
            url = image.url;
            realName = image.realName;
          }
          await prisma.createImage({
            id: image.id,
            url,
            name: image.name,
            realName,
            x: image.x,
            y: image.y,
            size: image.size,
            direction: image.direction,
            workspace: {
              connect: {
                id: image.workspaceId,
              },
            },
          });
        }
        return project.id;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
