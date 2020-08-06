module.exports = {
  friendlyName: 'Create new blob fork',

  description: 'This is an action to fork an existing blob',

  inputs: {
    id: {
      type: 'string',
      description: 'ID of the blob to fork from',
      required: true,
    },
  },

  exits: {
    success: {
      outputDescription: 'The newly created `Blob`.',
    },
    notFound: { responseType: 'notFound' },
  },

  fn: async ({ id }) => {
    sails.log('Forking from: ', id);
    const originalBlob = await Blobs.findOne({ id });
    const forkBlob = await Blobs.create().fetch();
    const configIDs = await Blobs.findOne({ id })
      .populate('configs')
      .then(({ configs }) => configs.map(({ id }) => id));
    sails.log('New fork ID is: ', forkBlob.id);

    await Blobs.addToCollection(originalBlob.id, 'forks').members([forkBlob.id]);
    await Blobs.addToCollection(forkBlob.id, 'configs').members(configIDs);

    await Blobs.update({ id: forkBlob.id })
      .set({
        source: originalBlob.source,
        plugin: originalBlob.plugin,
        forkedFrom: originalBlob.id,
      })
      .exec((err) => {
        sails.log(
          err
            ? `Error creating new blob: ${err}`
            : `Successfully created new blob`
        );
      });

    return _.omit(forkBlob, 'source', 'plugin');
  },
};
