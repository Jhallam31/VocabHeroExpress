const mongoose = require('mongoose');

const UserCardSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: false,
        require: 'You must be logged in to create a card',
        trim: true
    },

    cardId: {
        type: String,
        unique: false,
        require: 'Card Id not received',
        trim: true
    }
},{timestamps: true});

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL).then(()=>{console.log('...')})
module.exports = mongoose.model('UserCards', UserCardSchema);