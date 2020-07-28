module.exports = {
  friendlyName: "create new blob test friendly name",

  description:
    "new blob test name",

  inputs: {

    // Input is a test field to make sure stuff is added to database
    testString: {
      type: "string",
      description: "Test string input to test POST",
      required: true,
    },

  },

  exits: {
    success: {
      outputDescription: "The newly created `Blob`.",
      outputExample: {},
    },

    // Test error messages
    noString: {
      description: "No string was attached.",
      responseType: "badRequest",
    },
  },

  fn: async ({testString}) => {
    console.log("Creating something");
    
    var newBlob = await Blobs.create({
      testString: testString
    }).fetch();

    return {
      blob: newBlob,
    };
  },
};
