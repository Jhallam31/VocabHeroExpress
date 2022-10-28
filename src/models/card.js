const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    term: {
        type: String,
        unique: true,
        required: 'Please enter a term for your card',
        trim: true
    },

    definition: {
        type: String,
        unique: false,
        required: 'You must enter a definition',
        trim: true
    },
    userId: {
        type: String,
        unique: false,
        require: 'You must be logged in to create a card',
        trim: true
    },

}, {timestamps: true});

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL).then(()=>{console.log('...')})
module.exports = mongoose.model('Cards', CardSchema);