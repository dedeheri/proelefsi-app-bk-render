import shortid from "shortid";
import articleModel from "../../model/article.js";
import shortLinks from "../../model/shortLink.js";
import profileModel from "../../model/profile.js";
import cloudinary from "../../utils/cloudinary.js";
import { htmlToText } from "html-to-text";

async function generateShortLink(id) {
  const baseUrl = process.env.CLIENT_URL;
  const result = await shortLinks({
    articleId: id,
    shortLink: baseUrl + "/link/" + shortid.generate(),
  }).save();

  return result;
}

async function add(req, res) {
  try {
    const _id = shortid.generate();
    const title = req.body.title;
    const sub_title = req.body.sub_title;
    const draft = req.body.draft;
    const content = req.body.content;
    const topics = req.body.topics;
    const reference = req.body.reference;

    const tags = req.body.tags;
    const image_url = await cloudinary.v2.uploader.upload(req?.file?.path, {
      folder: "articles",
    });
    const authId = req.decode.id;

    const user = await profileModel.findOne({ authId: authId });

    function urlTitle(id) {
      const t = title.split(" ");
      const baseUrl = process.env.CLIENT_URL;
      const slug = baseUrl + "/" + user.username + "/" + id + "/" + t.join("-");
      return slug;
    }

    function readingTime() {
      const readingTime = htmlToText(content).split(" ").length;
      const seconds =
        Math.floor(readingTime / 60) + "." + Math.floor(readingTime % 60);
      return Number(seconds);
    }

    const shortLink = await generateShortLink(_id);
    const data = {
      _id,
      title,
      cloudinary_id: image_url.public_id,
      content,
      sub_title,
      reading_time: readingTime(),
      topics,
      tags,
      draft,
      reference: reference,
      image_url: image_url.secure_url,
      authour: {
        id: user._id,
        fullname: user.fullname,
        image_url: user.image_url,
        username: user.username,
      },
      url: {
        originalLink: urlTitle(_id),
        shortLink: shortLink.shortLink,
      },
    };

    await articleModel(data).save();
    return res.status(200).json({ message: req.t("ARTICLE.ADD") });
  } catch (error) {
    if (error.error.errno === -3008) {
      return res
        .status(500)
        .json({ code: 3008, error: req.t("ERROR.NETWORK") });
    }
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default add;
