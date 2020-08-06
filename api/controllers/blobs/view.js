module.exports = {
  friendlyName: 'View all blobs',
  description: 'View all blobs added to db',

  exits: {
    success: {
      outputDescription: 'Success',
      outputType: 'ref',
    },
    forbidden: { responseType: 'forbidden' },
    notFound: { responseType: 'notFound' },
  },

  fn: async () => {
    sails.log('Viewing all blobs');
    const blobs = await Blobs.find();
    return blobs;
  },
};
