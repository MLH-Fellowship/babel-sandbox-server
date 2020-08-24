const sails = require('sails');
const stubBlobs = require('./stub');
const supertest = require('supertest');

// Global before hook
before((done) => {
  sails.lift(
    {
      // These are sails configs that are over ridden
      // for the purposes of testing

      // wipe/drop ALL data and rebuild models every time test is run
      models: { migrate: 'drop' },

      // One level higher than silent
      log: { level: 'error' },

      // Disables console logs like: `GET /api/v1/blobs/view 200 7.822 ms - 438`
      requestlogger: false,

      // Grunt should disabled by default but this is extra precaution :/
      hooks: { grunt: false },
    },
    (err) => {
      if (err) {return done(err);}

      // Create an existing record in the db
      supertest(sails.hooks.http.app)
        .post('/api/v1/blobs/create')
        .send(stubBlobs.blob)
        .expect(200)
        .then((res) => {
          // Set the id so that it can be queried
          stubBlobs.blob.id = res.body.id;
          done();
        })
        .catch((err) => done(err));
    }
  );
});

after((done) => {
  sails.lower(done);
});
