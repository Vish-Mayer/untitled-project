process.env.NODE_ENV = "test";
import request from "supertest";
import app from "../../../app";

describe("POST/ signIn", () => {
  describe("given a username and a password", () => {
    it("should respnd with a 200 status code", async () => {
      const response = await request(app)
        .post("/auth/signIn")
        .send({
          name: "name",
          email: "email",
          password: "password"
        });
      expect(response.statusCode).toBe(200);
    });
  });
});
