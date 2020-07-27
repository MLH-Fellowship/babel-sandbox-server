module.exports = {
  friendlyName: 'Update',
  description: 'Update config.',
  inputs: {

  },
  exits: {

  },
  fn: async function (inputs) {

    console.log(Config);

    let config = await Config.create({
      source: 'hellow world',
      userCustomPlugin: true,
      customPluginSource: 'var a = b;'
    });

    // All done.
    return;

  }


};
