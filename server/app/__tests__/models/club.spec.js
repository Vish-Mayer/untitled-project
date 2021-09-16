import { Club, createClub, displayClubs } from "../../models/club.js";
import dbConnection from "../../dbConnection.js";
import { createUser } from "../../models/user.js";
import { createUserClub } from "../../models/userClub.js";

describe("Club", () => {
  beforeEach(async () => {
    await dbConnection.query("TRUNCATE TABLE clubs CASCADE");
    await dbConnection.query("TRUNCATE TABLE user_club CASCADE");
  });

  describe("initialize", () => {
    it("returns a club object", () => {
      const club = new Club(1, "name", "type", 100);
      expect(club.id).toEqual(1);
      expect(club.name).toEqual("name");
      expect(club.type).toEqual("type");
      expect(club.average_distance).toEqual(100);
    });
  });

  describe("createClub", () => {
    it("creates a new club object", async () => {
      const club = await createClub("name", "type", 200);
      expect(club.name).toEqual("name");
      expect(club.type).toEqual("type");
      expect(club.average_distance).toEqual(200);
    });
  });

  describe("displayClubs", () => {
    it("displays a club based on user id", async () => {
      const user = await createUser("user2", "user2@mail.com", "Password123");
      const club = await createClub("name", "type", 200);
      await createUserClub(user.id, club.id);
      const clubs = await displayClubs(user.id);
      expect(clubs[0].name).toEqual("name");
      expect(clubs[0].type).toEqual("type");
      expect(clubs[0].average_distance).toEqual(200);
    });
  });
});
