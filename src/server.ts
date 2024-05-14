import http from 'http';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import cors from './middleware/CorsMiddleware';

import contactRoutes from './routes/contact.routes';

dotenv.config();

console.log('isi dotenv', process.env.APP_NAME)
const router: Express = express();

/** Logging */
router.use(morgan('dev'));
// CORS
router.use(cors);
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());
/** Database */
const db = require('./models');
db.sequelize.sync();
// for drop and sync db alias reset db (all data will removed)
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

/** Routes */
router.use('/api/contact', contactRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.APP_PORT ?? 6090;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));