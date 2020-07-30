module.exports = {
  friendlyName: 'TestFriendlyName',
  description: 'Test description',
  inputs: {

  },

  exits: {
    success: {
      outputDescription: 'Test output description',
      outputType: 'ref',
    },
    forbidden: { responseType: 'forbidden' },
    notFound: { responseType: 'notFound' },
  },

  fn: async (inputs) => {
    console.log('Viewing all configs');
    const configs = await Config.find();
    return configs;
  },
};
