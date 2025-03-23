// /route/pages.js

const express = require('express');
const router = express.Router();


// Route for the members page (login/signup)
router.get('/', (req, res) => {
    const error = req.query.error || null;
    res.render('index', { 
        title: 'Title', 
        description: 'Description',
        error
    });
});


module.exports = router;