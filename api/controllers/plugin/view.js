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
    console.log('Viewing all plugins');
    const plugins = await Plugin.find();
    return plugins;
  },
};
