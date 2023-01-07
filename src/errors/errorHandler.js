function errorsHandlers(err, req, res, next) {
  const { status, message, errors, name } = err;
  if (name === "MulterError") {
    return res.status(413).json({ message: { avatar: req.t("ERROR.MULTER") } });
  } else {
    let v = {};
    if (errors) {
      errors.forEach(
        (errors) => (v[errors.param] = { message: req.t(errors.msg) })
      );
    }
    return res.status(status || 422).json({ validation: v });
  }
}

export default errorsHandlers;
