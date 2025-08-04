import mongoose from "mongoose";


const connectDB = async () => {
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("Database connected successfully");
})
.catch((error) => {
  console.error("Database connection error:", error);
})
}

export default connectDB;