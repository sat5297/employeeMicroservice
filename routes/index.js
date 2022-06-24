const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('The root of the web page');
});

module.exports = router;