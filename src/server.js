import express from 'express';
import { connect } from './database.js';
import morgan from 'morgan';
import cors from 'cors';
import marketplaceRouter from './routers/marketplaceRouter.js';
import Marketplace from './models/marketplaceModel.js';
import authRouter from './routers/authRouter.js';
const router = express.Router();
const server = express();
const PORT = 5000;
// another great change
server.use(morgan('dev'));
connect();
server.use(cors())
server.use(express.json())

server.use('/auth', authRouter)
server.use('/api/marketplaces', marketplaceRouter(router, Marketplace))

server.use('*', (req, res) => {
    return res.status(404).json({ error: 'not found!!' });
})



server.listen(PORT, () => {
    'listening!!'
})