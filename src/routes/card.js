const express = require('express');
const router = express.Router();
const Card = require('../controllers/card');

router.route('/').get(Card.index);
router.put('/update', Card.update);
router.post('', Card.create);
router.get('', Card.get);
router.delete('', Card.destroy);

module.exports = router;