process.env.NODE_ENV = "test";
import app from "../app.js";
import request from "supertest";
import { createUser } from "../models/user.js";
import jwtGenerator from "../utils/jwtGenerator.js";

describe("GET/ confirmation", () => {
  describe("verifies a user using jwt token", () => {
    it("returns status 200 code, get request made with jwt token changes user verified status", async () => {
      const user = await createUser("user1", "user1@email.com", "Password123");

      const check_verified = await user.verified();

      expect(check_verified).toEqual(false);

      const token = await jwtGenerator(user.id);

      const response = await request(app).get(`/auth/confirmation/${token}`);

      expect(response.statusCode).toBe(200);
      const check_verified2 = await user.verified();

      expect(check_verified2).toEqual(true);
    });
  });
});
