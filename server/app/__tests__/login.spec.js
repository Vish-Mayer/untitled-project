process.env.NODE_ENV = "test";
import request from "supertest";
import dbConnection from "../dbConnection.js";
import app from "../app";
import { createUser } from "../models/user.js";

describe("POST/ login", () => {
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
    it("should respond with a 200 status code if user is verified,", async () => {
      await createUser("user2", "user2@mail.com", "Password123");
      await dbConnection.query(
        "UPDATE users SET user_verified = TRUE WHERE user_email = 'user2@mail.com'"
      );
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "user2@mail.com",
          password: "Password123"
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      await dbConnection.query("TRUNCATE TABLE users");
    });
  });
});
