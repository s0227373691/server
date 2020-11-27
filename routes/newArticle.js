const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { NewArticle } = require('../modules/newArticle');

router.get('/', (req, res) => {
    res.send('newArticle');
});
router.post('/', async (req, res) => {
    const data = req.body;
    const newArticle = new NewArticle(
        _.pick(req.body, [
            'primaryType',
            'minorType',
            'date',
            'people',
            'title',
            'content',
        ])
    );
    await newArticle.save();
    res.send(data);
});

module.exports = router;
