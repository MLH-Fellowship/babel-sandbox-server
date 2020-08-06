module.exports = {
  friendlyName: 'View all plugins',
  description: 'View all plugins added to db',

  exits: {
    success: {
      outputDescription: 'Success',
      outputType: 'ref',
    },
    forbidden: { responseType: 'forbidden' },
    notFound: { responseType: 'notFound' },
  },

  fn: async () => {
    sails.log('Viewing all plugins');
    const plugins = await Plugin.find();
    return plugins;
  },
};
