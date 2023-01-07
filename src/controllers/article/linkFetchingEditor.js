import axios from "axios";

async function linkFetchingEditor(req, res) {
  const link = req.body.link;
  try {
    const response = await axios.get(link);
    return res.status(200).json({ result: response });
  } catch (error) {
    console.log(error);
  }
}

export default linkFetchingEditor;
