import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import mainRouter from "./routes/index.js";
import db from './models/index.js';

const { NODE_ENV, PORT } = process.env;

const app = express();

db.sequelize.authenticate()
    .then(() => console.log('Connexion to DB - Success'))
    .catch((error) => console.log('Connexion to DB - Error\n', error));

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', mainRouter);

app.listen(PORT, () => {
    console.log(`App Running on PORT ${PORT} ${NODE_ENV}`);
})