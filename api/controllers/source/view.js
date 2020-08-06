module.exports = {
  friendlyName: 'View all sources',
  description: 'View all sources added to db',

  exits: {
    success: {
      outputDescription: 'Success',
      outputType: 'ref',
    },
    forbidden: { responseType: 'forbidden' },
    notFound: { responseType: 'notFound' },
  },

  fn: async () => {
    sails.log('Viewing all sources');
    const sources = await Source.find();
    return sources;
  },
};
