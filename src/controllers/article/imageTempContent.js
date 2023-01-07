import imageTempModel from "../../model/imageTemp.js";
import cloudinary from "../../utils/cloudinary.js";

async function imageTempContent(req, res) {
  try {
    const image_temp = await cloudinary.v2.uploader.upload(req?.file?.path, {
      folder: "articles",
    });

    const result = await imageTempModel({
      cloudinary_id: image_temp.public_id,
      image_content: image_temp.url,
    }).save();

    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: req.t("WRONG.ERROR") });
  }
}
export default imageTempContent;
