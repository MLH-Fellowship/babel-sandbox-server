module.exports = {
  friendlyName: 'Retrieve a blob',
  description: 'Endpoint to get blob info using its ID',
  inputs: {
    id: {
      description: 'The ID of the blob we\'re retrieving',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      outputDescription: 'Blob and associated fields',
      outputType: 'ref',
    },
    forbidden: { responseType: 'forbidden' },
    notFound: {
      description: 'The requested ID does not exist',
      responseType: 'notFound'
    },
  },

  fn: async ({ id }) => {
    sails.log(`Retrieving blob with ID ${id}`);

    // Initialize response body
    const responseBody = {};

    // Check if blob with { id } exists
    if (!(await Blobs.findOne({ id }))) {throw 'notFound';}

    // Add source in base 64 to response body
    await Blobs.findOne({ id })
      .populate('source')
      .then(
        ({ source }) => (responseBody.base64SourceKey = source.base64SourceKey)
      );

    // Add plugin in base 64 to response body
    await Blobs.findOne({ id })
      .populate('plugin')
      .then(
        ({ plugin }) => (responseBody.base64PluginKey = plugin.base64PluginKey)
      );

    // Add configs in base 64 to response body
    await Blobs.findOne({ id })
      .populate('configs')
      .then(
        ({ configs }) =>
          (responseBody.configIDs = configs.map(
            (config) => config.base64ConfigKey
          ))
      );
    return responseBody;
  },
};
