process.env.NODE_ENV = "test";
import request from "supertest";
import dbConnection from "../../../dbConnection";
import createUser from "../database-queries/createUser";
import app from "../../../app";

describe("POST/ login", () => {
  beforeEach(async () => {
    await dbConnection.query("TRUNCATE TABLE users");
    await createUser("name", "validmail@mail.com", "password");
  });

  describe("given an incorrect email or password", () => {
    it("should respnd with a 401 status code,", async () => {
      const bodyData = [
        { email: "invalidmail@mail.com", password: "password" },
        { email: "validmail@mail.com", password: "incorrect-password" }
      ];
      for (const body of bodyData) {
        const response = await request(app)
          .post("/auth/login")
          .send(body);
        expect(response.statusCode).toBe(401);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
      }
    });
  });

  describe("given a correct email or password", () => {
    it("should respnd with a 200 status code,", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "validmail@mail.com",
          password: "password"
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});
