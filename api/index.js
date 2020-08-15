const express = require("express");
const routes = require("./src/routes");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/customers", routes.customerRouter);

app.listen(5000, () => console.log("Listening"));
