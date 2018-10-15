import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router';

const app = express();

const config = require('./config');

mongoose.connect(config.mongo.uri);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node-Passport-JWT-ES6-Starter app is listening on port ${port}!`))