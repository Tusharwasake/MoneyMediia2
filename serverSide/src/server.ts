import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./Database/database";



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
  connectDB();
});
