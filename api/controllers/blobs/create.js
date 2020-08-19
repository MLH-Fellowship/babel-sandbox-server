module.exports = {
  friendlyName: 'Create new blob',

  description: 'This is an action to add a new blob',

  inputs: {
    source: {
      type: 'string',
      description: 'Source code in base 64 representation',
      required: true,
    },
    plugin: {
      type: 'string',
      description: 'Plugin code in base 64 representation',
    },
    configs: {
      description: 'An array of base 64 string, each representing configs',
      type: ['string'],
    },
  },

  exits: {
    success: {
      outputDescription: 'The newly created `Blob`.',
    },
  },

  fn: async ({ source, plugin, configs }) => {
    sails.log('Creating blob');

    // Check for Blob and add if not present
    const newBlob = await Blobs.create().fetch();

    // Add shareble link to response body
    newBlob.url = `#/share/${newBlob.id}`;

    // Check for Source and add if not present
    const newSource = await Source.findOrCreate(
      { base64SourceKey: source },
      { base64SourceKey: source }
    );

    // Plugin is optional and it might be null/empty-string
    // hence ternary opertor, .findOrCreate() throws otherwise :(
    const newPlugin = plugin
      ? await Plugin.findOrCreate(
        { base64PluginKey: plugin },
        { base64PluginKey: plugin }
      )
      : null;

    // Create new config records if not alrady existing
    // Keep track of their primary key using configIDs
    const configIDs = [];
    if (configs) {
      for (const config of configs) {
        const newConfig = await Config.findOrCreate(
          { base64ConfigKey: config },
          { base64ConfigKey: config }
        );
        configIDs.push(newConfig.id);
      }
    }

    // Add configs to blob collection if not already present
    await Blobs.addToCollection(newBlob.id, 'configs').members(configIDs);

    // Add source and plugin to blob
    await Blobs.update({ id: newBlob.id })
      .set({ source: newSource.id, plugin: newPlugin?.id ?? null })
      .exec((err) => {
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
