import express, { Router } from 'express';
import User from '../models/userModel.js';
import argon from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import userSchema from '../validation/password-validation.js';

const router = Router();

router.post('/register', async (req, res, next) => {
    try {
        const { body } = req;
        console.log(body);
        const validValues = await userSchema.validateAsync(body);
        // todo validation and nice errors
        const hash = await argon.hash(validValues.password)

        const user = new User(validValues)
        user.password = hash;
        user.username = user.username.toLowerCase();
        await user.save();
        return res.status(201).end();

    } catch (e) {
        next(e);
    }
});


router.post('/login', async (req, res, next) => {
    try {
        const { body } = req;
        const { username, password
        } = body;
        const existingUser = await User.findOne({ username: username.toLowerCase() })
        if (await argon.verify(existingUser.password, password)) {
            const token = uuidv4()
            existingUser.token = token;
            await existingUser.save();
            return (res.status(200).json({ token }))
        } else {
            return (res.sendStatus(400))
        }
    } catch (err) {
        next(err);
    }
});

export default router;