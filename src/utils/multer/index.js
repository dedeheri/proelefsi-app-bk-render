import multer from "multer";

const size = {
  fileSize: 10 * 1024 * 1024,
};

const image = multer({
  storage: multer.diskStorage({}),
  limits: size,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/gif"
    ) {
      callback(null, true);
    } else {
      callback(null, false);

      const err = new Error(
        "Hanya mendukung format gambar png, jpg, webp dan gif"
      );
      err.name = "MulterError";
      return callback(err);
    }
  },
});

export default image;
