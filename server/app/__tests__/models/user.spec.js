import { User, createUser, authenticateUser } from "../../models/user.js";
import bcrypt from "bcrypt";
import dbConnection from "../../dbConnection";

describe("User", () => {
  beforeEach(async () => {
    await dbConnection.query("TRUNCATE TABLE users");
  });

  describe("initialize", () => {
    it("returns a user object", () => {
      const user = new User(1, "user1", "user1@mail.com");
      expect(user.id).toEqual(1);
      expect(user.name).toEqual("user1");
      expect(user.email).toEqual("user1@mail.com");
    });
  });

  describe("createUser", () => {
    it("creates a new user object", async () => {
      const user = await createUser("user1", "user1@mail.com", "Password123");
      expect(user.name).toEqual("user1");
      expect(user.email).toEqual("user1@mail.com");
    });
    it("is intialized with a default 'FALSE' verified status", async () => {
      const user = await createUser("user1", "user1@mail.com", "Password123");
      const user_verified = await user.verified();
      expect(user_verified).toEqual(false);
    });
    it("stores encryped password", async () => {
      const user = await createUser("user1", "user1@mail.com", "Password123");
      const password = await user.getPassword();
      const validPassword = await bcrypt.compare("Password123", password);
      expect(validPassword).toEqual(true);
    });
  });

  describe("authenticateUser", () => {
    it("returns a user account", async () => {
      await createUser("user2", "user2@mail.com", "Password123");
      const authenticatedUser = await authenticateUser(
        "user2@mail.com",
        "Password123"
      );
      expect(authenticatedUser.name).toEqual("user2");
    });
  });
});
