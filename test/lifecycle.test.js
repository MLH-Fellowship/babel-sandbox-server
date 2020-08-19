var sails = require('sails');

before(function(done) {

  this.timeout(5000);

  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },
        

  }, function(err) {
    if (err) { return done(err); }

    // Create some records in the database

    return done();
  });
});

after(function(done) {

  // Destroy the records created above

  sails.lower(done);

});