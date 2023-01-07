import moment from "moment";

function globalTime(req, res, next) {
  const cookie = req.cookies.i18next;
  moment.locale(cookie);

  next();
}

export default globalTime;
