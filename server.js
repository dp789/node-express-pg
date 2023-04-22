const express = require("express");
const expressListRoutes = require("express-list-routes");
const dotenv = require("dotenv");
const app = express();
const logReqRes = require("./middlewares/logger");

const user = require("./routes/user");
const connect = require("./utils/database/index");

dotenv.config({ path: "/.env.local" });

app.use(express.json());
app.use(logReqRes);

//connect to database
connect();

//mount routes
app.use("/api/v1/", user);

expressListRoutes(user);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`server on port ${PORT}!`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err}`);
  server.close(() => process.exit(1));
});
