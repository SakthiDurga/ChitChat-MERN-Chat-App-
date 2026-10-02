import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // under req.body. a middleware to get access to fields that the user sends

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

connectDB().then(() => {
    app.listen(PORT, () => { console.log("Server running on port " + PORT) });
}).catch((e) => {
    console.error(e);
})