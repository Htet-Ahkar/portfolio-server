import "dotenv/config";

//Dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

//Routes
import blogRoutes from "./routes/blogs.js";
import projectRoutes from "./routes/projects.js";

//App
const app = express();

//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//setup routes and connect database

app.get("/", (req, res) => {
  res.send("Hello to my portfolio backend.");
});

app.use("/blogs", blogRoutes);
app.use("/projects", projectRoutes);

const DATABASE = process.env.CONNECTION_URL;
const port = process.env.PORT || 4000;

mongoose
  .connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    )
  )
  .catch((error) => console.log(error));
