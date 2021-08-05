process.env.NODE_ENV = "test";
const db = require("../../db");
const request = require("supertest");
const app = require("../../app");

describe("POST/ register", () => {
  describe("given a username and a password", () => {
    it("should respnd with a 200 status code, returns json in the content type header, response contains a userId", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          name: "name",
          email: "email",
          password: "password"
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body.userId).toBeDefined();
    });
  });

  describe("when an entry is missing", () => {
    it("returns status 400 code", async () => {
      const bodyData = [
        { name: "name", email: "email" },
        { email: "email", password: "password" },
        { password: "password", name: "name" },
        { name: "name" },
        { email: "email" },
        { password: "password" },
        {}
      ];

      for (const body of bodyData) {
        const response = await request(app)
          .post("/auth/register")
          .send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
