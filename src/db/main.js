import mongoose from "mongoose";

async function coonection() {
  try {
    const config = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(
      "mongodb+srv://proelefsi:222200046ok@cluster0.dyyt0rv.mongodb.net/?retryWrites=true&w=majority",
      config
    );
    console.log("database connecting");
  } catch (error) {
    console.log(error);
  }
}

export default coonection;
