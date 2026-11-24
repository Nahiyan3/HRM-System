import express, { Request, Response } from "express";
import pool from "./config/db.js";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(cors());

const PORT = 5000;

// Middleware
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get("/api/db-test", async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connected successfully!",
            time: result.rows[0].now
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});
// Test route
app.get("/", (req: Request, res: Response) => {
    res.send("HRM System API is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});