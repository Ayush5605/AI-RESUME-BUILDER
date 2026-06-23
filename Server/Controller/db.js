import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;
    const projectName = "AI_Resume_Builder";

    if (!mongodbURI) {
      throw new Error("MongoDB URI environment variable not set");
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`);

    console.log("DB connected successfully");

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established");
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;