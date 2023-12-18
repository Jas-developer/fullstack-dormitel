const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const router = require("./routes/boarderRoutes");
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
const dbConnect = require("./database/dbConnection");
dbConnect();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/", router);
app.use("/api/", require("./routes/userRoutes"));
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(errorHandler);
