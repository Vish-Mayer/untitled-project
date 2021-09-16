process.env.NODE_ENV = "test";
import app from "../app.js";
import request from "supertest";
import { createUser } from "../models/user.js";

describe("GET/ user_id ", () => {
  describe("users the user id to get the club data", () => {
    it("returns status 200 code", async () => {
      const user = await createUser("user1", "user1@email.com", "Password123");

      const response = await request(app).get(`/golf-bag/${user.id}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("POST/ new ", () => {
  describe("route to add a new club", () => {
    it("returns status 200 code", async () => {
      const user = await createUser("user1", "user1@email.com", "Password123");

      const response = await request(app)
        .post(`/golf-bag/new/${user.id}`)
        .send({
          name: "name",
          type: "user0@mail.com",
          average_distance: 100
        });
      expect(response.statusCode).toBe(200);
    });
  });
});
