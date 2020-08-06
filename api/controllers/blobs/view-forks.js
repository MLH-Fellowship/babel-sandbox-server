module.exports = {
  friendlyName: 'View forks',

  description: 'This is an action to view forks of an existing blob',

  inputs: {
    id: {
      type: 'string',
      description: 'ID of the blob to view the `forks`',
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
    const forks = await Blobs.findOne({ id })
      .populate('forks')
      .then(({ forks }) => forks.map(({ id }) => id));
    if (!forks) {throw 'notFound';}

    return forks;
  },
};
