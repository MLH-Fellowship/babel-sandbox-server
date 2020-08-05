module.exports = {
  friendlyName: "Create new blob test",

  description: "This is an action to add a new blob",

  inputs: {
    source: {
      type: "string",
      description: "Source code in base 64 representation",
      required: true,
    },
    plugin: {
      type: "string",
      description: "Plugin code in base 64 representation",
      required: true,
    },
    configs: {
      description: "An array of base 64 string, each representing configs",
      type: ["string"],
      required: true,
    },
  },

  exits: {
    success: {
      outputDescription: "The newly created `Blob`.",
    },
  },

  fn: async ({ source, plugin, configs }) => {
    sails.log("Creating blob");

    // Check for Blob and add if not present
    const newBlob = await Blobs.create().fetch();

    // Add shareble link to response body
    newBlob.url = `/share/${newBlob.id}`;

    // Check for Plugin and add if not present
    const newPlugin = await Plugin.findOrCreate(
      { base64PluginKey: plugin },
      { base64PluginKey: plugin }
    );

    // Check for Source and add if not present
    const newSource = await Source.findOrCreate(
      { base64SourceKey: source },
      { base64SourceKey: source }
    );

    // Create new config records if not alrady existing
    // Keep track of their primary key using configIDs
    const configIDs = [];
    for (const config of configs) {
      const newConfig = await Config.findOrCreate(
        { base64ConfigKey: config },
        { base64ConfigKey: config }
      );
      configIDs.push(newConfig.id);
    }

    // Add configs to blob collection if not already present
    await Blobs.addToCollection(newBlob.id, "configs").members(configIDs);

    // Add source and plugin to blob
    await Blobs.update({ id: newBlob.id }).set(
      { source: newSource.id, plugin: newPlugin.id }
    ).exec(function (err, blob) {
      sails.log(
        err
          ? `Error creating new blob: ${err}`
          : `Successfully created new blob`
      );
    });

    // Return newly created blob, omit the `source` and `plugin` fields
    return _.omit(newBlob, 'source', 'plugin');
  },
};
