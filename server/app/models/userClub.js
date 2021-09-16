import connection from "../dbConnection.js";

export class UserClub {
  constructor(user_id, club_id) {
    this.user_id = user_id;
    this.club_id = club_id;
  }
}

export const createUserClub = async (user_id, club_id) => {
  const club = await connection.query(
    "INSERT INTO user_club(user_id, club_id) VALUES ($1, $2) RETURNING *",
    [user_id, club_id]
  );

  const newUserClub = new UserClub(club.rows[0].user_id, club.rows[0].club_id);

  return newUserClub;
};
