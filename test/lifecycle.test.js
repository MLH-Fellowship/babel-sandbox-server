var sails = require('sails');

// Global before hook
before(function (done) {
    sails.lift({
      // wipe/drop ALL data and rebuild models every time test is run
      models: { migrate: 'drop' },
        log: { level: 'warn' },
    }, function (err) {
        if (err) { return done(err); }
        return done();
    });
});

after(function (done) {
    sails.lower(done);
});