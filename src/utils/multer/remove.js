import fs from "fs";
import path from "path";

function remove(location) {
  try {
    const __dirname = path.resolve();
    const p = path.join(__dirname, location);
    fs.unlinkSync(p);
  } catch (error) {
    console.log(error);
  }
}

export default remove;
