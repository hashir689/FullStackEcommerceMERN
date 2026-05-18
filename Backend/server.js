import express from "express";
import "dotenv/config";
import ConnectDb from "./Database/db.js";
import userRoute from "./Routes/userRoute.route.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "*",
    Credential: true,
  }),
);
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.listen(PORT, () => {
  ConnectDb();
  console.log(`server is listening at PORT:${PORT}`);
});
