const { Snippet } = require("../../../snippet");
const UglifyJS = require("uglify-js");
const { config } = require("grunt");
module.exports = {
  friendlyName: "Create new blob test",

  description: "This is an action to add a new blob",

  inputs: {
    source: {
      type: {},
      description: "Source code",
      required: true,
    },
    plugin: {
      type: {},
      description: "Plugin Code",
      required: true,
    },
    configs: {
      description: "An array of configs",
      type: [
        {
          // descripton is the FIELD "description" with TYPE "string" in the request body
          description: "string",
        },
      ],
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

    // Base64 is used to check if the plugin
    // or source code or config exists
    const blobSnippet = new Snippet(
      source.description,
      plugin.description,
      configs.map(({ description }) => description)
    );
    const sourceBase64 = Snippet.ID(source.description);
    const pluginBase64 = Snippet.ID(plugin.description);
    const blobBase64 = blobSnippet.Link();

    // Check for Blob and add if not present
    const newBlob = await Blobs.findOrCreate(
      { base64BlobKey: blobBase64 },
      { base64BlobKey: blobBase64 }
    );

    // Check for Plugin and add if not present
    const newPlugin = await Plugin.findOrCreate(
      { base64PluginKey: pluginBase64 },
      { base64PluginKey: pluginBase64, description: plugin.description }
    );

    // Check for Source and add if not present
    const newSource = await Source.findOrCreate(
      { base64SourceKey: sourceBase64 },
      { base64SourceKey: sourceBase64, description: source.description }
    );

    await Blobs.update(
      { id: newBlob.id },
      { source: newSource.id, plugin: newPlugin.id }
    ).exec(function (err, blob) {
      sails.log(
        err
          ? `Error creating new blob: ${err}`
          : `Successfully created new blob`
      );
    });

    // TODO: Add a return; problem: the fields "source" and "plugin" show up as null :(
    // return {
    //   blob: newBlob
    // }
  },
};
