import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import indexRouter from "./routes/indexRoter";
import authRouter from "./routes/authRouter";
import passport from "./config/passport-config";
import blogRouter from "./routes/blogRouter";
import tagRouter from "./routes/tagRouter";
import corsOptions from "./config/cors";

require('dotenv').config();

const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRouter)
app.use("/api/blogs", blogRouter)
app.use("/api/tags", tagRouter)
app.use("/api", indexRouter)

// Catch-all for routes that don't exist
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "The route you are looking for does not exist.",
  });
});

// Error handling middleware
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
