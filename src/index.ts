import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import helmet from "helmet";
import cors from "cors";
import sequelize from "./database/models/index.js";
import AuthenticationRouter from "./modules/authentication/authentication.routes.js";
import LoanRouter from "./modules/loan/loan.routes.js";
import ProfileRouter from "./modules/profile/profile.routes.js";
import NotificationRouter from "./modules/notification/notification.routes.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_, response: Response) => {
  return response.send("Agrizen Server Running");
});

app.use("/api/auth", AuthenticationRouter);
app.use("/api/loan", LoanRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/notification", NotificationRouter);

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
