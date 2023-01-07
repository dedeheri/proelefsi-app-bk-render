import { validationResult } from "express-validator";
import ValidationException from "../shared/validationException.js";

function validationForm(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.mapped();
    const resultErr = Object.keys(err).map((key) => err[key]);
    return next(new ValidationException(resultErr));
  }
  next();
}

export default validationForm;
