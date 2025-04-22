import express, { Request, Response, NextFunction } from "express";
import indexRouter from "./routes/indexRoter";
import authRouter from "./routes/authRouter";
import passport from "./config/passport-config";

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRouter)
app.use("/api", indexRouter)

// Error handler

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  const data: {
    statusCode: number;
    message: string;
    details?: unknown;
  } = {
    statusCode,
    message: err.message || "Something went wrong",
  };

  if (err.details) {
    data.details = err.details;
  }

  res.status(statusCode).json(data);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
