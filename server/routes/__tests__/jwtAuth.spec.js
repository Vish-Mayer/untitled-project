process.env.NODE_ENV = "test";
const db = require("../../db");
const request = require("supertest");
const app = require("../../app");

describe("POST/ register", () => {
  describe("given a username and a password", () => {
    it("should respnd with a 200 status code", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          name: "name",
          email: "email",
          password: "password"
        });
      expect(response.statusCode).toBe(200);
    });

    it("returns json in the content type header", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          name: "name",
          email: "email",
          password: "password"
        });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});
