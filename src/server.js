import express from 'express';
import { connect } from './database';
import Marketplaces from './models/marketplaceModel';
const server = express();
const PORT = 5000;

connect();
server.use(express.json())

server.get('/api/marketplaces', async (req, res) => {
    try {
        const marketplaces = await Marketplaces.find({})
        return res.json(marketplaces);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
})

server.post('/api/marketplaces', async (req, res) => {
    try {
        const { body } = req;
        if (!body.name || !body.description || !body.owner) {
            return res.status(400).send('not good request...');
        }

        //does marketplace exist?
        const x = await Marketplaces.findOne({ name: body.name })


        const marketplace = new Marketplaces(body);
        await marketplace.save();

        return res.status(201).json({
            data: marketplace
        });


    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
})



server.use('*', (req, res) => {
    return res.status(404).json({ error: 'not found!!' });
})
server.listen(PORT, () => {
    'listening!!'
})