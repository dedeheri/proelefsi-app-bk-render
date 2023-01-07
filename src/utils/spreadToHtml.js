import parser from "./parserBlocks.js";

function spreadToHtml(article) {
  const resultData = [];
  for (let b = 0; b < article.length; b++) {
    resultData.push({
      ...article[b]._doc,
      content: parser(article[b].content),
    });
  }

  return resultData;
}

export default spreadToHtml;
