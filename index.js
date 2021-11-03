
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import { connectDB, resetDB } from './db.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/uploads", express.static("uploads"));

app.use('/resetData', function(req, res, next){ resetDB(), res.json({success: true})});


const PORT = process.env.PORT|| 5000;

connectDB();  
app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`))