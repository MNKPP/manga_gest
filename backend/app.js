import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';

const { NODE_ENV, PORT } = process.env;

const app = express();

app.use(morgan('tiny'));

app.use('/', (req, res) => {
    res.send('Hello World');
})
app.listen(PORT, () => {
    console.log(`App Running on PORT ${PORT} ${NODE_ENV}`);
})