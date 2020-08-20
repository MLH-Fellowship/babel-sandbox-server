const supertest = require("supertest");

describe("Blob", () => {
  it("Creates a new blob", (done) => {
    const newBlob = {
      source: "base64Source",
      plugin: "base64Plugin",
      configs: ["base64Configtwo", "base64Configone"],
    };

    let id;
    supertest(sails.hooks.http.app)
      .post("/api/v1/blobs/create")
      .send(newBlob)
      .expect(200)
      .then((res) => {
        id = res.body.id;
        console.log(id);
        console.log(JSON.stringify(res));
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  
  });
});
