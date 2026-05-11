import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./features/auth/auth.controllers.js";
import complaintRoutes from "./features/complaint/complaint.route.js";
import mlComplaintRoutes from "./features/complaint/fastapi.route.js";

dotenv.config();
const app = express();
app.use(express.json());

// Ensure the database connection is established before handling requests
await connectDB();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
);

// Test route to verify DB connection
app.get("/health", async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        res.json({ status: "ok", db: result[0].version });
    } catch (error) {
        console.error("DB Connection Error:", error);
        res.status(500).json({ error: "Database connection failed" });
    }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/complaints", complaintRoutes);
app.use("/api/v1/complaints", mlComplaintRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
