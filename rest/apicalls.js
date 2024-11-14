import express from 'express';
import index from './api/index.js';
import data from './api/data.js';

const app = express();
app.use(express.json());



app.use('/', index);
app.use('/data', data);

export default app;