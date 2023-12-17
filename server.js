const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const router = require("./routes/boarderRoutes");
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/", router);
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(errorHandler);
