import visitorModel from "../../model/visitor.js";

async function notInterested(req, res) {
  const _gid = req.cookies._gid;
  const articleId = req.body.articleId;

  try {
    const visitor = await visitorModel.findOne({ _gid });

    if (visitor) {
      await visitorModel.updateOne(
        {
          _gid: _gid,
        },
        { $push: { not_interseted: articleId } }
      );

      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        result: "Not interseted successfully submit",
      });
    } else {
      return false;
    }
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default notInterested;
