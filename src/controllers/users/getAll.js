import moment from "moment";
import userModel from "../../model/auth.js";
import profileModel from "../../model/profile.js";

async function getAll(req, res) {
  const sort = parseInt(req.query.sort) || -1;
  const search = req.query.search || "";
  const filter = req.query.role || "";

  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startPage = (page - 1) * limit;
  const endPage = page * limit;

  try {
    const users = await userModel.find({}).sort({ createdAt: sort });
    const resultUsers = [];
    for (let i = 0; i < users.length; i++) {
      const profile = await profileModel
        .findOne({ authId: users[i]._id })
        .sort({ createdAt: sort });

      resultUsers.push({
        ...profile._doc,
        email_verify: {
          value: users[i].email_verify,
          t: users[i].email_verify
            ? req.t("USERS.EMAIL_VERIFY")
            : req.t("USERS.EMAIL_NOT_VERIFY"),
        },
        updatedAt: moment(profile.updatedAt).format("LL"),
        createdAt: moment(profile.createdAt).format("LL"),
        last_active: moment(profile.last_active).fromNow("LL"),
      });
    }

    // filter by role
    const filterByRole = Object.values(resultUsers).filter(({ role }) => {
      return role.toLowerCase().includes(filter.toLowerCase());
    });

    // search by name
    const filterByName = Object.values(filterByRole).filter(({ fullname }) => {
      return fullname.toLowerCase().includes(search.toLowerCase());
    });

    const resultPage = {
      current: page,
      total: resultUsers.length,
      from: startPage + 1,
      to: endPage > filterByName.length ? filterByName.length : endPage,
      perPage: limit,
    };

    if (endPage < resultUsers.length) {
      resultPage.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startPage > 0) {
      resultPage.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const result = filterByName.slice(startPage, endPage);

    if (result.length === 0) {
      return res.status(404).json({ message: req.t("USERS.NOT_FOUND") });
    } else {
      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        users: result,
        page: resultPage,
      });
    }
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default getAll;
