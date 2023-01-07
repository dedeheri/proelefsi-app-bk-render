import { body } from "express-validator";

function validation(prop) {
  switch (prop) {
    case "REGISTRATION": {
      return [
        body("fullname").notEmpty().withMessage("FORM.FULLNAME"),
        body("email")
          .notEmpty()
          .withMessage("FORM.EMAIL")
          .isEmail()
          .withMessage("FORM.FORMAT_EMAIL"),
        body("password")
          .notEmpty()
          .withMessage("FORM.PASSWORD")
          .isLength({ min: 6 })
          .withMessage("FORM.MIN_PASSWORD"),
        body("image_url").custom((value, { req }) => {
          if (!req.file) {
            throw new Error("FORM.IMAGE");
          }
          return true;
        }),
      ];
    }

    case "EMAIL": {
      return [
        body("email")
          .notEmpty()
          .withMessage("FORM.EMAIL")
          .isEmail()
          .withMessage("FORM.FORMAT_EMAIL"),
      ];
    }

    case "LOGIN": {
      return [
        body("email")
          .notEmpty()
          .withMessage("FORM.EMAIL")
          .isEmail()
          .withMessage("FORM.FORMAT_EMAIL"),
        body("password")
          .notEmpty()
          .withMessage("FORM.PASSWORD")
          .isLength({ min: 6 })
          .withMessage("FORM.MIN_PASSWORD"),
      ];
    }

    case "OTP": {
      return [body("otp").notEmpty().withMessage("FORM.OTP")];
    }

    case "REPEAT_PASSWORD": {
      return [
        body("password")
          .notEmpty()
          .withMessage("FORM.PASSWORD")
          .isLength({ min: 6 })
          .withMessage("FORM.MIN_PASSWORD"),
        body("repeatPassword")
          .notEmpty()
          .withMessage("FORM.REPEAT_PASSWORD")
          .custom((value, { req }) => {
            if (req.body.repeatPassword !== undefined) {
              if (req.body.password !== req.body.repeatPassword) {
                throw new Error("FORM.REPEAT_PASSWORD_NOT_SAME");
              }
            }
            return true;
          }),
      ];
    }

    // articel
    // add
    case "CREATE_ARTICLE": {
      return [
        body("title").notEmpty().withMessage("ARTICLE.TITLE"),
        body("content").notEmpty().withMessage("ARTICLE.CONTENT"),
        body("topics").notEmpty().withMessage("ARTICLE.TOPICS"),
        body("image_url").custom((value, { req }) => {
          if (!req.file) {
            throw new Error("ARTICLE.IMAGE");
          }
          return true;
        }),
      ];
    }

    // update
    case "UPDATE_ARTICLE": {
      return [
        body("title").notEmpty().withMessage("ARTICLE.TITLE"),
        body("content").notEmpty().withMessage("ARTICLE.CONTENT"),
        body("topics").notEmpty().withMessage("ARTICLE.TOPICS"),
      ];
    }

    // category
    case "CREATE_TOPICS": {
      return [body("topics").notEmpty().withMessage("TOPICS.TOPICS")];
    }

    // roe
    case "CREATE_ROLE": {
      return [body("role").notEmpty().withMessage("FORM.ROLE")];
    }

    // setting
    // change password
    case "CHANGE_PASSWORD": {
      return [
        body("currentPassword")
          .notEmpty()
          .withMessage("FORM.PASSWORD")
          .isLength({ min: 6 })
          .withMessage("FORM.MIN_PASSWORD"),
        body("newPassword")
          .notEmpty()
          .withMessage("FORM.PASSWORD")
          .isLength({ min: 6 })
          .withMessage("FORM.MIN_PASSWORD"),
        body("retypePassword")
          .notEmpty()
          .withMessage("FORM.REPEAT_PASSWORD")
          .custom((value, { req }) => {
            if (req.body.retypePassword !== undefined) {
              if (req.body.newPassword !== req.body.retypePassword) {
                throw new Error("FORM.REPEAT_PASSWORD_NOT_SAME");
              }
            }
            return true;
          }),
      ];
    }
    // change name
    case "CHANGE_NAME": {
      return [body("fullName").notEmpty().withMessage("FORM.FULLNAME")];
    }

    case "CHANGE_BIODATA": {
      return [body("biodata").notEmpty().withMessage("FORM.BIODATA")];
    }
    case "CHANGE_PHOTO_PROFILE": {
      return [
        body("image_url").custom((value, { req }) => {
          if (!req.file) {
            throw new Error("FORM.IMAGE");
          }
          return true;
        }),
      ];
    }
    case "CHANGE_COVER": {
      return [
        body("image_url").custom((value, { req }) => {
          if (!req.file) {
            throw new Error("FORM.IMAGE");
          }
          return true;
        }),
      ];
    }

    // feedback
    case "FEEDBACK": {
      return [
        body("feedback").notEmpty().withMessage("FEEDBACK.FEEDBACK_INPUT"),
      ];
    }
    // report
    case "REPORT": {
      return [body("problem").notEmpty().withMessage("REPORT.REPORT_INPUT")];
    }
  }
}

export default validation;
