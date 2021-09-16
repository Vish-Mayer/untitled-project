process.env.NODE_ENV = "test";
import request from "supertest";
import dbConnection from "../dbConnection.js";
import app from "../app";
import { createUser } from "../models/user.js";

describe("POST/ login", () => {
  const getResponse = async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "user2@mail.com",
        password: "Password123"
      });
    return response;
  };

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
});
