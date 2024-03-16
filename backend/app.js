import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import mainRouter from "./routes/index.js";
import db from './models/index.js';

const { NODE_ENV, PORT } = process.env;

const app = express();

app.use(morgan('tiny'));

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


app.use('/api', mainRouter);

app.listen(PORT, () => {
    console.log(`App Running on PORT ${PORT} ${NODE_ENV}`);
})