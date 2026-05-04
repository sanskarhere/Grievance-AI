import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';


dotenv.config();
const app = express();
app.use(express.json());

await connectDB(); // Ensure the database connection is established before handling requests

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});