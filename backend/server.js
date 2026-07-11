import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.router.js";
import userRoutes from "./routes/user.router.js";
import postRoutes from "./routes/post.router.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import helmet from "helmet";
import contactRoute from "./routes/contact.js";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Secure the app with Helmet headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        imgSrc: ["'self'", "data:", "blob:"],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'"],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    },
    frameguard: {
      action: "deny",
    },
    noSniff: true,
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    crossOriginResourcePolicy: {
      policy: "cross-origin", // Allow cross-origin requests for static images
    },
  })
);

// Static files for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3002", // local frontend (optional but good)
      // "https://lost-and-found-app-frontend.vercel.app", // deployed frontend
    ],
    credentials: true,
  })
);
// Routes
app.use("/api/contact", contactRoute);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Lost and Found App Backend is running!");
});

// ❗ Error handler should be LAST
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
