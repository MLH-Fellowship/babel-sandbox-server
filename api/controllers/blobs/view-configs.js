module.exports = {
  friendlyName: 'View configs',

  description: 'This is an action to view configs of an existing blob',

  inputs: {
    id: {
      type: 'string',
      description: 'ID of the blob to view the `configs`',
      required: true,
    },
  },

  exits: {
    success: {
      outputDescription: 'Blob found and query was successful',
    },
    notFound: { responseType: 'notFound' },
  },

  fn: async ({ id }) => {
    const configs = await Blobs.findOne({ id })
      .populate('configs')
      .then(({ configs }) => configs.map(({ id }) => id));
    if (!configs) {throw 'notFound';}

    return configs;
  },
};
