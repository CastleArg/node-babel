import mongoose from 'mongoose';


export const connect = () => {
    // connect to mongo
    mongoose.connect('mongodb://localhost:27016/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
        if (err) {
            return console.error(err)
        }
        console.log('connected to Mongo!!')
    })
}


export const disconnect = () => {
    mongoose.disconnect();
}