const { Snippet } = require('../../../snippet');
const  UglifyJS = require("uglify-js");
const { config } = require('grunt');

module.exports = {
  friendlyName: "create new blob test friendly name",

  description:
    "new blob test name",

  inputs: {

    sourceCode: {
      type: {},
      description: "Source code",
      required: true,
    },
    pluginSource: {
      type: {},
      description: "plugin Code",
      required: true,
    },
    configs: {
      description: 'An array of configs',
      type: [
        {
          description: 'string',
        }
      ],
      required: true
    }

  },

  exits: {
    success: {
      outputDescription: "The newly created `Blob`.",
    },
  },

  fn: async ({sourceCode, pluginSource,configs}) => {
    console.log("Creating something");
    console.log(sourceCode.description)
    console.log(pluginSource.description)
    console.log(configs[0].description);
    console.log(configs[1].description);
    
    // var newBlob = await Blobs.create({
    //   testString: testString
    // }).fetch();

    // return {
    //   blob: newBlob,
    // };
  },
};
