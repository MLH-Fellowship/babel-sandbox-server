module.exports = {
  friendlyName: "Retrieve a blob",
  description: "Endpoint to get blob info using its ID",
  inputs: {
    id: {
      description: "The ID of the blob we're retrieving",
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      outputDescription: "Blob and associated fields",
      outputType: "ref",
    },
    forbidden: { responseType: "forbidden" },
    notFound: {
      description: "The requested ID does not exist",
      responseType: "notFound",
    },
  },

  fn: async ({ id }) => {
    sails.log(`Retrieving blob with ID ${id}`);

    // Initialize response body
    const responseBody = {};

    const blob = await Blobs.findOne({ id });

    // Check if blob with { id } exists
    if (!blob) {
      throw "notFound";
    }

    // Add source in base 64 to response body
    await Blobs.findOne({ id })
      .populate("source")
      .then(
        ({ source }) => (responseBody.base64SourceKey = source.base64SourceKey)
      );

    // Add plugin in base 64 to response body
    await Blobs.findOne({ id })
      .populate("plugin")
      .then(
        ({ plugin }) => (responseBody.base64PluginKey = plugin ? plugin.base64PluginKey:null)
      );

    // Add configs in base 64 to response body
    await Blobs.findOne({ id })
      .populate("configs")
      .then(
        ({ configs }) =>
          (responseBody.configIDs = configs ? configs.map(
            (config) => config.base64ConfigKey
          ): null)
      );
    return responseBody;
  },
};
