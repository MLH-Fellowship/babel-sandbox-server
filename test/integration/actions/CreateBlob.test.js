var supertest = require("supertest");

describe("Blob", () => {
  it("should create a new blob", (done) => {
    supertest(sails.hooks.http.app)
    .get("/api/v1/blobs/view")
    .expect(200, done);
  });
});
