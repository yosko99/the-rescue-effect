import * as bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const app = express();

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

export default app;
