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

    // Find orignal-blob and initialize fork-blob
    const originalBlob = await Blobs.findOne({ id });
    if (!originalBlob) { throw 'notFound'; }

    const forkBlob = await Blobs.create().fetch();
    sails.log('New fork ID is: ', forkBlob.id);

    // Get the config IDs of original-blob
    const configIDs = await Blobs.findOne({ id })
      .populate('configs')
      .then(({ configs }) => configs.map(({ id }) => id));

    // Add configIDs to fork-blob
    await Blobs.addToCollection(forkBlob.id, 'configs').members(configIDs);

    // Add fork-blob's id to orignal-blob's list of forks
    await Blobs.addToCollection(originalBlob.id, 'forks').members([forkBlob.id]);

    // Add source, plugin and original-fork's ID to fork-blob
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

    // Add share link to res body
    forkBlob.url = `#/share/${forkBlob.id}`;

    // Return everything in forkBlob apart from the `source` and `plugin` field
    return _.omit(forkBlob, 'source', 'plugin');
  },
};
