import articleModel from "../../model/article.js";
import profileModel from "../../model/profile.js";
import cloudinary from "../../utils/cloudinary.js";
import generateShortLink from "../../utils/shortLink.js";
import slug from "../../utils/slug.js";

async function update(req, res) {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const topics = req.body.topics;
    const tags = req.body.tags;
    const sub_title = req.body.sub_title;
    const userId = req.decode.id;
    const image_url = req.file;

    const article = await articleModel.findById({ _id: id });
    if (!article) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_AVAILABLE") });
    }

    const user = await profileModel.findOne({ authId: userId });

    const slugs = slug(title, topics, id);
    const shortLink = await generateShortLink(slugs);

    if (image_url !== undefined) {
      await cloudinary.uploader.destroy(article.cloudinary_id);

      const image = await cloudinary.v2.uploader.upload(req?.file?.path, {
        folder: "articles",
      });

      await articleModel.findByIdAndUpdate(
        { _id: article._id },
        {
          title,
          content,
          cloudinary_id: image.public_id,
          topics,
          tags,
          sub_title,
          editor: user._id,
          url: {
            originalLink: slugs,
            shortLink: shortLink.shortLink,
          },
          image_url: image.secure_url,
        },
        { new: true }
      );
    } else {
      await articleModel.findByIdAndUpdate(
        { _id: article._id },
        {
          title,
          content,
          topics,
          tags,
          sub_title,
          editor: user._id,
          url: {
            originalLink: slugs,
            shortLink: shortLink.shortLink,
          },
        },
        { new: true }
      );
    }

    return res.status(200).json({ message: req.t("ARTICLE.UPDATE") });
  } catch (error) {
    if (error.error.errno === -3008) {
      return res
        .status(500)
        .json({ code: 3008, error: req.t("ERROR.NETWORK") });
    }
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default update;
