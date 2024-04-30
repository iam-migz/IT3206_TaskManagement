import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(morgan('dev'))
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// app check
app.get("/", (req, res) => res.sendStatus(200));

app.use("/api", routes);
app.use(errorHandler);

app.listen(4000, () => {
  console.log(`Listening: http://localhost:${4000}`);
});
