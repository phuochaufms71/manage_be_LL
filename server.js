import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { timeTableRoute } from "./routes/timeTableRoute.js";
import { studentRoute} from "./routes/studentRoute.js";
import { authRoute } from "./routes/authRoute.js";
import { scoreRoute } from "./routes/scoreRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api/student', studentRoute);
app.use('/api/score', scoreRoute);
app.use('/api/timeTable', timeTableRoute);
app.use('/api/auth', authRoute);

mongoose.connect(process.env.DB_URI, {dbName: 'manage_student'})
    .then((res) => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })

