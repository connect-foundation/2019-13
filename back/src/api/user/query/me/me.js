import utils from '../../../../utils/utils';

export default {
  Query: {
    me: async (root, _, context) => {
      const user = utils.findUser(context.req);
      if (!user) return null;
      return user;
    },
  },
};
