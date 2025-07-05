import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Route/taskRoute.js";
import cors from "cors";

dotenv.config();



//connect to mongodb
mongoose.connect(process.env.MongoDB_URL, {
    useNewUrlParser: true,// this tells mongoose to use new mongodb connection string parser which handles connection string more reliably and support new features.
    useUnifiedTopology: true,// this enable server discovery & monitoring.

}).then(() =>{
    console.log('mongodb conneted successfully');
}).catch((err) => {
    console.error('mongodb connection error:', err)
});
console.log('mongodb conneted')

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','https://delicate-kangaroo-48e72f.netlify.app/'],// this is the frontend url
}))

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.use('/', router);


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})