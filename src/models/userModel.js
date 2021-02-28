import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    groups: []
})

export default mongoose.model('Users', schema, 'users')