import express from 'express';
import config from "../config/default";
import log from './logger';
import connect from './db/connect';
import routes from './routes';

// const port = config.get('port') as number;
// const host = config.get('host') as string;

const port = config.port as number;
const host = config.host as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
    log.info(`I'm all ears: ${host}:${port}`);

    connect();

    routes(app);
});
