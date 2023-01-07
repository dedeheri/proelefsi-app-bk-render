import visitor from "../../../model/visitor.js";

async function searchHistory(req, res) {
  try {
    const _gid = req.cookies._gid;

    if (_gid) {
      const visitorModel = await visitor
        .findOne({ _gid })
        .sort({ timestamps: -1 });

      return res.status(200).json({
        message: req.t("MESSAGE.SUCCESS"),
        result: visitorModel.search_term.slice(0, 4),
      });
    } else {
      return res.status(404).json({
        message: req.t("MESSAGE.SUCCESS"),
      });
    }

    return;
  } catch (error) {
    return res.status(404).json({ error: req.t("ERROR.WRONG") });
  }
}

export default searchHistory;
