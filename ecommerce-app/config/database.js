import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database, ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error in Database ${error}`);
  }
};

export default connectDatabase;
