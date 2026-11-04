import "dotenv/config";
import express from 'express';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from './lib/db.js';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // under req.body. a middleware to get access to fields that the user sends

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

connectDB().then(() => {
    app.listen(PORT, () => { console.log("Server running on port " + PORT) });
    console.log("SMTP USER:", JSON.stringify(process.env.EMAIL_USER));
    console.log("SMTP PASS LENGTH:", process.env.EMAIL_PASS?.length);
}).catch((e) => {
    console.error(e);
})