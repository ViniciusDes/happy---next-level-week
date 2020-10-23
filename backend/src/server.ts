import express, { response } from "express";
import routes from "./routes"
import './database/conenection';
import path from "path";


const app = express();
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, '..', 'uploads')))

app.listen(3333); 