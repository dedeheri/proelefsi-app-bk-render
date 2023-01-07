function upperCase(str) {
  return str.replace(/(?<=\b)[a-z](?=\w*)/g, (c) => c.toUpperCase());
}

export default upperCase;
