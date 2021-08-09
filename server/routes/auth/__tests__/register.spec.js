process.env.NODE_ENV = "test";
import request from "supertest";
import dbConnection from "../../../dbConnection";
import app from "../../../app";

describe("POST/ register", () => {
  beforeAll(async () => {
    await dbConnection.query("TRUNCATE TABLE users");
  });

  describe("given a username and a password", () => {
    it("should respnd with a 200 status code, returns json in the content type header, response contains a userId", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          name: "name",
          email: "validmail@mail.com",
          password: "Validpassword1"
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    it("correctly stores user_name, email, and encryted password into the database", async () => {
      await request(app)
        .post("/auth/register")
        .send({
          name: "name",
          email: "validmail@mail.com",
          password: "Validpassword1"
        });
      const database = await dbConnection.query("SELECT * FROM users");
      expect(database.rows[0].user_name).toEqual("name");
      expect(database.rows[0].user_email).toEqual("validmail@mail.com");
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
    it("should respnd with a 401 status code", async () => {
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
