import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import helmet from "helmet";
import cors from "cors";
import sequelize from "./database/models/index.js";
import AuthenticationRouter from "./modules/authentication/authentication.routes.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_, response: Response) => {
  return response.send("Server Running");
});

app.use("/api", AuthenticationRouter);

app.use(errorHandler());

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    console.log(`Server running on port: ${PORT} - http://localhost:${PORT}`);
    try {
      await sequelize.authenticate();
      console.log("DB connected successfully");
      try {
        await sequelize.sync();
        console.log("DB synced successfully");
      } catch (e) {
        console.log("Failed to sync DB");
      }
    } catch (e) {
      console.log("Failed to connect to DB");
    }
  } catch (e) {
    console.log("Failed to run server");
  }
});
