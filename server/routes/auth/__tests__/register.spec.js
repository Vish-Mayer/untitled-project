process.env.NODE_ENV = "test";
import app from "../../../app";
import request from "supertest";
import dbConnection from "../../../dbConnection";
import bcrypt from "bcrypt";
import createUser from "../database-queries/createUser";

describe("POST/ register", () => {
  afterEach(async () => {
    await dbConnection.query("TRUNCATE TABLE users");
  });

  describe("given a username and a password", () => {
    it("should call bcryptGenerator", async () => {
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
      await createUser("name", "validmail2@mail.com", "Validpassword2");
      const user = await dbConnection.query("SELECT * FROM users");
      expect(user.rows[0].user_name).toEqual("name");
      expect(user.rows[0].user_email).toEqual("validmail2@mail.com");
      expect(
        await bcrypt.compare("Validpassword2", user.rows[0].user_password)
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
