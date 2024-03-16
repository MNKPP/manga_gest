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

if(NODE_ENV === 'dev') {
    //? Méthode pour initialiser les objet de la DB  (basique)
    //db.sequelize.sync();

    //? Méthode pour initialiser et modifier les objet de la DB
    //db.sequelize.sync({ alter: { drop: false } });

    //? Méthode pour forcer les objet de la DB (Dernier recours - En DEV!)
    db.sequelize.sync({ force: true });
}


app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', mainRouter);

app.listen(PORT, () => {
    console.log(`App Running on PORT ${PORT} ${NODE_ENV}`);
})