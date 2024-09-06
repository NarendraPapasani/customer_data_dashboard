const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./config/db.js");

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/customer", require("./routes/customerRoutes"));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
