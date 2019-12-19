import { prisma } from '../../../prisma-client';

export default {
  workspace: {
    blocks: ({ id }) => prisma.workspace({ id }).blocks(),
    images: ({ id }) => prisma.workspace({ id }).images(),
  },
};
