const validNewClub = (req, res, next) => {
  const { name, type, average_distance } = req.body;

  if (![name, type, average_distance].every(Boolean)) {
    return res.status(400).send({
      type: "error",
      name: "missing_data",
      msg: "Missing Credentials"
    });
  }
  next();
};

export default validNewClub;
