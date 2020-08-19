module.exports = {
  friendlyName: 'Update Blob',
  description: 'Update the source, plugin, configs(s) of an existing blob',

  inputs: {
    id: {
      description: 'The id of the thing being borrowed',
      type: 'string',
      required: true,
    },
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
      description: `The blob has been updated successfully`,
    },
    notFound: {
      description: 'The requested ID does not exist',
      responseType: 'notFound',
    },
  },

  fn: async function ({ id, source, plugin, configs }) {
    // Check if blob exists
    const updatedBlob = await Blobs.findOne({ id });
    if (!updatedBlob) { throw 'notFound'; }

    sails.log('Updating blob: ', id);

    // Check for Source and Plugin
    // and add to db if not present
    const updatedSource = await Source.findOrCreate(
      { base64SourceKey: source },
      { base64SourceKey: source }
    );

    const updatedPlugin = plugin ? await Plugin.findOrCreate(
      { base64PluginKey: plugin },
      { base64PluginKey: plugin }
    ) : null;

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

    // Updated the blob source, plugin and configs
    await Blobs.updateOne({ id }).set({
      source: updatedSource.id,
      plugin: updatedPlugin?.id ?? null,
    });

    await Blobs.replaceCollection(updatedBlob.id, 'configs').members(configIDs)

    // TODO: `source` and `plugin` will be null if they were updated
    return {
      ...updatedBlob,
      url: `#/share/${updatedBlob.id}`,
    };
  },
};
