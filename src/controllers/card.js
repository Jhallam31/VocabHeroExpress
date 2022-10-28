const Card = require('../models/card');
const jwt = require('../middlewares/jwt');
// @route GET api/card
// @desc Returns all cards
// @access Public
exports.index = async function (req, res) {
    const cards = await Card.find({});
    res.status(200).json({cards});
};

// @route POST api/card
// @desc Add a new card
// @access Public
exports.create = async function (req, res) {
    try{
        const userId = req.user._id;
        const {term, definition} = req.body;

        const newCard = new Card({term,definition, userId});
        await newCard.save();

        res.status(200).json({message: 'Card created'});
    } catch(e){
        res.status(500).json({success: false, message: e.message})
    }
};

// @route GET api/card/{id}
// @desc Returns a specific card
// @access Public
exports.get = async function (req, res) {
    try {
        const id = req.params.id;

        const card = await Card.findById(id);

        if (!card) return res.status(404).json({message: 'Card does not exist'});

        res.status(200).json({card});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route PUT api/card/{id}
// @desc Update card details
// @access Public
exports.update = async function (req, res) {
    try {
        const id = req.params.id
        const update = req.body;
        
        const card = await Card.findById(id);
        const cardUserid = card.userId;
        const userId = req.user._id;

        // Make sure the logged in user owns the card
        if (userId.toString() !== cardUserid.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});

        const card_ = await Card.findByIdAndUpdate(id, {$set: update}, {new: true});

        return res.status(200).json({card: card_, message: 'Card has been updated'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route DESTROY api/card/{id}
// @desc Delete Card
// @access Public
exports.destroy = async function (req, res) {
    try {
        const cardId = req.params.id;
        const user_id = req.user._id;
        const card = await Card.findById(cardId);

        //Make sure the passed userid is that of the logged in user
        if (user_id.toString() !== card.userId.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});

        await Card.findByIdAndDelete(cardId);
        res.status(200).json({message: 'Card has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
