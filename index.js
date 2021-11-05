
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import { connectDB, resetDB } from './db.js';
import * as dotenv from 'dotenv'

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get("/", (req, res) => {
    res.json({ success: true })
});
app.get('/resetData', function (req, res, next) {
    resetDB(), res.json({ success: true, reset: true })
});
app.use('/posts', postRoutes);
app.use("/uploads", express.static("uploads"));



dotenv.config({ path: "./env/config.env" })
const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`))