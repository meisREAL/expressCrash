const express = require('express');
const router = express.Router();
const members = require('../../Members');


//! when using Router, use router instead of app in req methods
//* simple REST API that returns JSON
// Gets all members
router.get('/', (req, res) => {
    //! no need to use JSON.stringify, express takes care of it
    res.json(members);
});

// GET single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        //* req.params.stuff lets reach to request parameters
        //! parseInt is used because req.params returns a string and we use ===
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ message: `No member with id ${req.params.id}` });
    }

});

module.exports = router;