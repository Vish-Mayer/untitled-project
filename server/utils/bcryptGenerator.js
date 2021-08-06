import bcrypt from "bcrypt";

const bcryptGenerator = async password => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  return bcryptPassword;
};

export default bcryptGenerator;
