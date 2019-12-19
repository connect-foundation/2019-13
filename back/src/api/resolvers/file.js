
export default {
  Mutation: {
    singleUpload: async (obj, { file }) => {
      const { filename, mimetype, encoding } = await file;
      console.log(filename, mimetype, encoding);
      const returnFile = { filename, mimetype, encoding };
      return returnFile;
    },
  },
};
