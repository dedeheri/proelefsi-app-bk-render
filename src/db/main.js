import mongoose from "mongoose";

async function coonection() {
  try {
    const config = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.DATABASE_URL, config);
    console.log("database connecting");
  } catch (error) {
    console.log("here");
    console.log(error);
  }
}

export default coonection;
