import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import mainRouter from "./routes/index.js";

const { NODE_ENV, PORT } = process.env;

const app = express();

app.use(morgan('tiny'));

app.use('/api', mainRouter);

app.listen(PORT, () => {
    console.log(`App Running on PORT ${PORT} ${NODE_ENV}`);
})