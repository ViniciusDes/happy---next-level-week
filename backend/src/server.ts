import express from "express";
import path from "path";
import "express-async-errors";
import routes from "./routes";
import './database/conenection';
import errorHandler from "./errors/handler";
import {cors} from "cors"
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, '..', 'uploads')))//construindo o endereço para acessar arquivos 
app.use(errorHandler);


app.listen(3333); 