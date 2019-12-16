import { prisma } from '../../../prisma-client';


export default {
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(),
  },
};
