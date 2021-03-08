const getRouter = (router, Marketplaces) => {
    router.get('/', async (req, res, next) => {
        console.log('you are in the get route')
        // determine who the currently logged in person is
        const usernameOfPersonWHoMadeTHisRequest = req.username;

        try {
            // get only the marketplaces where that person is the owner
            const marketplaces = await Marketplaces.find({ owner: usernameOfPersonWHoMadeTHisRequest })
            return res.json(marketplaces);
        } catch (e) {
            console.error(e);
            return res.status(500).send(e);
        }
    })

    router.post('/', async (req, res) => {
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
    router.put('/:id', async (req, res, next) => {
        try {
            const { body } = req;
            const { id } = req.params;
            console.log(id);

            const usernameOfPersonWHoMadeTHisRequest = req.username;

            if (!id) {
                return res.status(400).json({ error: 'Marketplace id parameter required' });
            }
            // check body properties - name, description, owner
            if (
                !body.hasOwnProperty('name') ||
                !body.hasOwnProperty('description') ||
                !body.hasOwnProperty('owner') ||
                !body.hasOwnProperty('taxCode')
            ) {
                return res.status(400).json({ error: 'Marketplace name, description, owner required' });
            }
            // find marketplaceby id


            // is this person the owner? 

            if(usernameOfPersonWHoMadeTHisRequest != existingMarketplace.owner) {
                return 401
            }
            //
            const marketplace = await Marketplaces.findByIdAndUpdate(id, body)  /// , { new: true } .lean();
            delete marketplace.__v;
            console.log(marketplace);

            return res.status(200).json({
                success: true,
                data: marketplace
            });
        } catch (e) {
            if (e.kind == 'ObjectId' && e.path == '_id') {
                return res.status(400).json({ error: 'Invalid id parameter' });
            }
            next(e);
        }
    });

    return router;
}



export default getRouter;