import mongoose, { mongo } from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String },
    genre: String
})

export default mongoose.model('Books', schema, 'books')