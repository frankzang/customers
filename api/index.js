const express = require("express");
const routes = require("./src/routes");
const app = express();

app.use("/customers", routes.customerRouter);

app.listen(5000, () => console.log("Listening"));
