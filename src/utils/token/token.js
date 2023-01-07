import jwt from "jsonwebtoken";

function _accessToken(p) {
  return jwt.sign({ id: p }, process.env.ACCESS_TOKEN);
}

function _refreshToken(p, t) {
  return jwt.sign({ id: p }, process.env.ACCESS_TOKEN, {
    expiresIn: t,
  });
}

export { _accessToken, _refreshToken };
