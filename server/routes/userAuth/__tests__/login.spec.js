process.env.NODE_ENV = "test";
import request from "supertest";
import app from "../../../app";

describe("POST/ login", () => {
  describe("given a username and a password, returns json in the content type header", () => {
    it("should respnd with a 200 status code", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          name: "name",
          email: "email",
          password: "password"
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});
