const supertest = require("supertest");
const stubBlobs = require("../../stub");

describe("Blob", () => {
  it("Gets existing blob", (done) => {
    supertest(sails.hooks.http.app)
      .get(`/api/v1/blobs/${stubBlobs.blob.id}`)
      .expect(200)
      .then((res) => done())
      .catch((err) => done(err));
  });

  it("Creates a new blob", (done) => {
    supertest(sails.hooks.http.app)
      .post("/api/v1/blobs/create")
      .send(stubBlobs.blob_1)
      .expect(200)
      .then((res) => done())
      .catch((err) => done(err));
  });

  it('Updates an existing blob', (done) => {
    supertest(sails.hooks.http.app)
      .put(`/api/v1/blobs/update/${stubBlobs.blob.id}`)
      .send(stubBlobs.blob_2)
      .expect(200)
      .then((res) => done())
      .catch((err) => done(err))
  });
});
