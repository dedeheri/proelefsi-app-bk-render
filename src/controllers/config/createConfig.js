import configModel from "../../model/config.js";

async function createConfig(id) {
  try {
    await configModel({
      userId: id,
    }).save();
  } catch (error) {
    console.log(error);
  }
}

export default createConfig;
