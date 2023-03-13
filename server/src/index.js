const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
