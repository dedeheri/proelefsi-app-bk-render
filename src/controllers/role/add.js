import roleModel from "../../model/role.js";
import upperCase from "../../utils/uppercase.js";

async function addRole(req, res) {
  try {
    const role = req.body.role;

    // check exist
    const roles = await roleModel.findOne({ role });
    if (roles) {
      return res.status(422).json({ message: req.t("ROLE.EXIST") });
    }

    await roleModel({
      role: upperCase(role),
    }).save();

    return res.status(200).json({ message: `Successfully add role` });
  } catch (error) {
    return res.status(500).json({ message: req.t("WRONG.MESSAGE") });
  }
}

export default addRole;
