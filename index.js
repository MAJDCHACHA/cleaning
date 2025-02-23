import express from "express";
import cors from "cors";
import initializeDatabase from "./config/index.js"; // Import the database initializer
import corsOptions from "./config/corsOrigin.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import root from "./routes/root.js";
import userRoute from "./routes/userRoute.js";
import needRoute from "./routes/needRoute.js";
import extraRoute from "./routes/extraRoute.js";
import frequencyRoute from "./routes/frequencyRoute.js";
import typeOfSend from "./utils/notFound.js";
import servicesRoute from "./routes/servicesRoute.js";
import availableRoute from "./routes/availableRoute.js";
import orderRoute from "./routes/orderRoute.js";
import path from "path";
import helmet from "helmet";
import { fileURLToPath } from "url";
import auth from "./routes/authRout.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT;

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use("/api", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads")); // To serve static files

// Routes
app.use("/", root);
app.use("/auth", auth);
app.use("/user", userRoute);
app.use("/need", needRoute);
app.use("/extra", extraRoute);
app.use("/frequency", frequencyRoute);
app.use("/services", servicesRoute);
app.use("/available", availableRoute);
app.use("/order", orderRoute);
app.all("*", typeOfSend);

initializeDatabase.then((db) => {
  db.sequelize.sync({ alter: false })
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error("Database sync error:", err);
    });
});
