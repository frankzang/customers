import express from "express";
import routes from "./src/routes";
// import cors from "cors";
const app = express();

const PORT = 8000;

// app.use(cors());

app.use("/customers", routes.customerRouter);

app.listen(PORT, () => console.log("app is running at http://localhost:%d/", PORT));
