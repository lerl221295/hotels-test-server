import "babel-polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import * as models from './models'
import routes from './routes/routes';
import cors from 'cors';
import {config} from 'dotenv';
import mongoose from 'mongoose';

config();

if(process.env.DEV == "false" || process.env.DEV == "FALSE"){
	//CONECTING MONGODB
	mongoose.Promise = Promise;
	mongoose.connect('mongodb://localhost/almundotest');
}

let app = express(),
	port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
routes(app);
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Hotels API!!!" });
});
app.listen(port);

console.log('Test server corriendo por el puerto: ' + port);
