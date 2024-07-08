import express from 'express';
const app = express();
import 'dotenv/config';
import {connectDB} from "./config/db.js";
import {updateWeatherEachTenSecond} from "./controller/weatherController.js";
import weatherRoute from'./routes/weatherRoutes.js';
connectDB();
app.use(express.static('views'));
app.use('/weather', weatherRoute , ()=> {
    console.log("hit the api");
}) ;


const PORT = process.env.PORT||7070;
app.listen(PORT, () => {
    console.log(`server on - ${PORT}`);

   setInterval(updateWeatherEachTenSecond , 10 * 60 * 1000); // 1 Menuts - 60000 ms
});