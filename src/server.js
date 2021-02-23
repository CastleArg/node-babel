import express from 'express';
import { connect } from './database.js';
import cors from 'cors';;
import Marketplaces from './models/marketplaceModel.js';

const PORT = 5000;

connect();
server.use(cors())
server.use(express.json())

server.get('/api/marketplaces', async (req, res) => {
    console.log('you are in the get route')
    try {
        const marketplaces = await Marketplaces.find({})
        return res.json(marketplaces);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
})

server.post('/api/marketplaces', async (req, res) => {
    console.log('you are in the post route')
    const theBody = req.body;
    try {
        const newMarketplace = new Marketplaces(theBody);
        await newMarketplace.save();
        return res.status(201).send('good job');

    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
})

// PUT

// DELETE




server.use('*', (req, res) => {
    return res.status(404).json({ error: 'not found!!' });
})
server.listen(PORT, () => {
    'listening!!'
})