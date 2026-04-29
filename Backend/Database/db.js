import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/abc`);
    console.log("Mongoose Connected Successfuly");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDb;
