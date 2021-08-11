process.env.NODE_ENV = "test";
import app from "../../../app.js";
import request from "supertest";
import dbConnection from "../../../dbConnection.js";
import bcrypt from "bcrypt";
import { activeUser } from "../database-queries/createTestUser.js";
import getUserByMail from "../database-queries/user.js";

describe("POST/ register", () => {
  afterEach(async () => {
    await dbConnection.query("TRUNCATE TABLE users");
  });

  describe("given a username and a password", () => {
    it("should respond with a status 200 and return a json object", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          name: "user0",
          email: "user0@mail.com",
          password: "Password123"
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("database entry", () => {
    it("correctly stores user_name, email, and encryted password into the database", async () => {
      await activeUser("user1", "user1@mail.com", "Password123");
      const user = await getUserByMail("user1@mail.com");

      expect(user.rows[0].user_name).toEqual("user1");
      expect(user.rows[0].user_email).toEqual("user1@mail.com");
      expect(
        await bcrypt.compare("Password123", user.rows[0].user_password)
      ).toEqual(true);
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

  describe("invaild email or password", () => {
    it("should respond with a 401 status code", async () => {
      const bodyData = [
        { name: "name", email: "invalid-email", password: "invalid-password" },
        {
          name: "name",
          email: "validmail@mail.com",
          password: "invalid-password"
        },
        { name: "name", email: "invalid-email", password: "Validpassword1" }
      ];
      for (const body of bodyData) {
        const response = await request(app)
          .post("/auth/register")
          .send(body);
        expect(response.statusCode).toBe(401);
      }
    });
  });
});
