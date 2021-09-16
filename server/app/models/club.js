import connection from "../dbConnection.js";

export class Club {
  constructor(id, name, type, average_distance) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.average_distance = average_distance;
  }
}

export const displayClubs = async user_id => {
  const clubs = await connection.query(`
    SELECT id, club_name, club_type, average_distance 
    FROM user_club as UC 
    INNER JOIN 
    clubs as C 
    ON UC.club_id = C.club_id 
    WHERE user_id = '${user_id}'
  `);

  return clubs.rows.map(function(club) {
    const clubs = new Club(
      club.id,
      club.club_name,
      club.club_type,
      club.average_distance
    );
    return clubs;
  });
};

export const createClub = async (name, type, average) => {
  const club = await connection.query(
    `
    INSERT INTO 
    clubs(club_name, club_type, average_distance) 
    VALUES ($1, $2, $3) 
    RETURNING *
    `,
    [name, type, average]
  );

  const new_club = new Club(
    club.rows[0].club_id,
    club.rows[0].club_name,
    club.rows[0].club_type,
    club.rows[0].average_distance
  );

  return new_club;
};
