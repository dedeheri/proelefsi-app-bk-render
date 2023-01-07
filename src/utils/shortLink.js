import shortid from "shortid";
import shortLinks from "../model/shortLink.js";

async function generateShortLink(url) {
  const baseUrl = process.env.CLIENT_URL;
  const result = await shortLinks({
    shortLink: baseUrl + "/" + shortid.generate(),
    originalLink: url,
  }).save();

  return result;
}

export default generateShortLink;
