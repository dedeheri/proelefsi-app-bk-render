function slug(title, topics, id) {
  const t = title.split(" ");
  const baseUrl = process.env.CLIENT_URL;
  const slug = baseUrl + "/" + topics + "/" + id + "/" + t.join("-");
  return slug;
}

export default slug;
