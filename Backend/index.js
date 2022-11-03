import express from "express";
import mongoosse from "mongoose";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/Todo.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoosse.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Connected");
  }
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/todos", notesRoute);

app.use(express.static(path.join(__dirname, "/Client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/Client/build", "index.html"));
});

app.all("*", (req, res) => {
  res.status(404).json({
    status: "404 error",
    msg: "Page Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
