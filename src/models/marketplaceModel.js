import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true, unique: true },
  
    admins: []
})
======
export default mongoose.model('Marketplaces', schema, 'marketplaces')