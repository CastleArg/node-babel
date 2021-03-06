import mongoose from 'mongoose';
// a great change
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    marksnum: { type: Number },
    owner: String
})

export default mongoose.model('Marketplaces', schema, 'marketplaces')