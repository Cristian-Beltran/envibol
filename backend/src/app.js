import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import roleRoutes from "./routes/role.routes.js";
import turnstileRoutes from "./routes/turnstile.routes.js";
import cardRoutes from "./routes/card.routes.js";
import externalRoutes from "./routes/external.routes.js";
import visitRoutes from "./routes/visit.routes.js";
import entrieRoutes from "./routes/entrie.routes.js";
import typeCardRoutes from "./routes/typecard.routes.js";
import statsRoutes from "./routes/stats.routes.js";

const app = express();
//Config
app.set("appName", "MERN APP");
app.set("port", process.env.PORT || 3000,);
// Middleware
app.use(
  cors({
    origin: "https://envibol.netlify.app",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api", authRoutes);
app.use("/api", employeeRoutes);
app.use("/api", roleRoutes);
app.use("/api", turnstileRoutes);
app.use("/api", cardRoutes);
app.use("/api", externalRoutes);
app.use("/api", visitRoutes);
app.use("/api", entrieRoutes);
app.use("/api", typeCardRoutes);
app.use("/api", statsRoutes);

export default app;
