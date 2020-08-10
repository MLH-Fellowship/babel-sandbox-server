module.exports = {
  friendlyName: 'View all configs',
  description: 'View all configs added to db',

  exits: {
    success: {
      outputDescription: 'Success',
      outputType: 'ref',
    },
    forbidden: { responseType: 'forbidden' },
    notFound: { responseType: 'notFound' },
  },

  fn: async () => {
    sails.log('Viewing all configs');
    const configs = await Config.find();
    return configs;
  },
};
