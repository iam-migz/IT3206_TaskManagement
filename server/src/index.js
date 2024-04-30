import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import helmet from "helmet";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

app.listen(4000, () => {
  console.log(`Listening: http://localhost:${4000}`);
});
