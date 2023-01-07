async function visitor(req, res) {
  res.cookie("visitorId", 12312);

  return res.status(200).json("w");
}

export default visitor;
