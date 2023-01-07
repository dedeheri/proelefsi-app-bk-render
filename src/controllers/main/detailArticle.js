import moment from "moment";
import articleModel from "../../model/article.js";
import visitorModel from "../../model/visitor.js";
import chartModel from "../../model/chart.js";
import editorParser from "editorjs-html";

async function addView(id, view) {
  await articleModel.findByIdAndUpdate(
    { _id: id },
    { view: view + 1 },
    { new: true }
  );
}

async function visitorPush(_gid, article) {
  const visitor = await visitorModel.findOne({ _gid: _gid });
  if (!visitor) {
    await visitorModel({
      _gid,
      in_topics: article.topics,
      article_id: article._id,
    }).save();
  } else {
    await visitorModel.updateOne(
      {
        _gid: _gid,
      },
      { $push: { in_topics: article.topics, article_id: article._id } }
    );
  }
}

async function addChart(article) {
  const dateNow = moment().format("DD MMMM YYYY");
  const chart = await chartModel.findOne({
    articleId: article._id,
    timestamp: dateNow,
  });
  if (chart) {
    await chartModel.findByIdAndUpdate(
      { _id: chart._id },
      { view: chart.view + 1 },
      { new: true }
    );
  } else {
    await chartModel({
      articleId: article._id,
      view: +1,
    }).save();
  }
}

function convertDataToHtml(blocks) {
  const convertedHtml = [];
  blocks.map((block) => {
    switch (block.type) {
      case "header":
        convertedHtml.push(
          ...[`<h${block.data.level}>${block.data.text}</h${block.data.level}>`]
        );
        break;
      case "embded":
        convertedHtml.push(
          ...[
            `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`,
          ]
        );
        break;
      case "paragraph":
        convertedHtml.push(...[`<p>${block.data.text}</p>`]);
        break;
      case "delimiter":
        convertedHtml.push(
          ...[`<div class="delimiter"><p>•</p><p>•</p><p>•</p></div`]
        );
        break;
      case "image":
        convertedHtml.push(
          ...[
            `<div>
            <img class="image-fluid" src="${block.data.file.url}" <img/>   
            <div class="caption-image">${block.data.caption}</div>
            </div>`,
          ]
        );
        break;
      case "code":
        convertedHtml.push(...[`<div id="code">${block.data.code}</div>`]);
        break;
      case "raw":
        convertedHtml.push(
          ...[`<div id="raw"><p>${block.data.html}</p></div>`]
        );
        break;
      case "list":
        convertedHtml.push("...[<ul>]");
        block.data.items.forEach(function (li) {
          convertedHtml.push(...[`<li>${li}</li>`]);
        });
        convertedHtml.push(...["</ul>"]);
        break;
      case "quote":
        convertedHtml.push(
          ...[
            `
        <div>
        <p>${block.data.text}</p>
        <p class="caption-image">${block.data.caption}</p>
        </div`,
          ]
        );
        break;
      default:
        console.log("no case");
        break;
    }
  });
  return convertedHtml;
}

async function detailArticle(req, res) {
  const id = req.params.id;
  const slug = id.split("-").slice(-1).pop();
  try {
    const article = await articleModel.findOne({ _id: slug });
    if (!article) {
      return res.status(404).json({ message: req.t("ARTICLE.NOT_AVAILABLE") });
    }

    const { _gid } = req.cookies;
    visitorPush(_gid, article);
    addView(article._id, article.view);
    addChart(article);

    const parseJson = JSON.parse(article.content);
    const parserEditor = new editorParser();
    const parser = parserEditor.parse(parseJson);

    const result = {
      ...article._doc,
      content: convertDataToHtml(parseJson.blocks),
    };

    return res.status(200).json({
      message: req.t("MESSAGE.SUCCESS"),
      result: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: req.t("ERROR.WRONG") });
  }
}

export default detailArticle;
