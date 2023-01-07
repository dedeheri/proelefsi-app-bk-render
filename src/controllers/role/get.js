import moment from "moment";
import profileModel from "../../model/profile.js";
import roleModel from "../../model/role.js";

async function getAllRole(req, res) {
  try {
    const roles = await roleModel.find({}).sort({ createdAt: -1 });

    if (roles.length === 0) {
      return res.status(404).json({ message: req.t("ROLE.EMPTY") });
    }

    const resultData = [];
    for (let i = 0; i < roles.length; i++) {
      const userRole = await profileModel.find({ role: roles[i].role });
      resultData.push({
        ...roles[i]._doc,
        user_role: userRole.length,
        body: roles[i].role,
        role: req.t("ROLE." + roles[i].role),
        createdAt: moment(roles[i].createdAt).format("LL"),
        updatedAt: moment(roles[i].updatedAt).format("LL"),
      });
    }

    return res
      .status(200)
      .json({ message: req.t("MESSAGE.SUCCESS"), result: resultData });
  } catch (error) {
    return res.status(500).json({ message: req.t("ERROR.WRONG") });
  }
}

export default getAllRole;
