module.exports = {
  friendlyName: "TestFriendlyName",
  description: "Test description",
  inputs: {
    id: {
      description: "The id of the blob we're retrieving",
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
    notFound: { responseType: "notFound" },
  },

  fn: async ({ id }) => {
    sails.log(`Retrieving blob with id ${id}`);
    let responseBody = {};
    await Blobs.findOne({ id })
      .populate("source")
      .then(
        ({ source }) => (responseBody.base64SourceKey = source.base64SourceKey)
      );
    await Blobs.findOne({ id })
      .populate("plugin")
      .then(
        ({ plugin }) => (responseBody.base64PluginKey = plugin.base64PluginKey)
      );
    await Blobs.findOne({ id })
      .populate("configs")
      .then(
        ({ configs }) =>
          (responseBody.configIDs = configs.map(
            (config) => config.base64ConfigKey
          ))
      );
    return responseBody;
  },
};
