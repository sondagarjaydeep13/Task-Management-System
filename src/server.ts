import express, { Application } from 'express';
import { AppConfig } from './config/app.config';
import { dbConnector } from './config/db.connect';
import AppRouter from './router/app.router';

const app: Application = express();

const port: number = Number(AppConfig.PORT);
const dbUrl: string = AppConfig.DB_URL;

app.use(express.json());
app.use('/api', AppRouter);

// Db connection
dbConnector(dbUrl);

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});