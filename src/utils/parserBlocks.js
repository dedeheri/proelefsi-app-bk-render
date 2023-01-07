import editorParser from "editorjs-html";

function parser(data) {
  const parseJson = JSON.parse(data);
  const parserEditor = new editorParser();
  const parser = parserEditor.parse(parseJson);

  return parser;
}

export default parser;
