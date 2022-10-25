const express = require('express');
const uuid = require('uuid');
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

// POST (create) a member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(), //Generates random universal ID
        name: req.body.name,
        email: req.body.email,
        status: 'active' //todo: change from hardcoded status later
    };

    if (!newMember.name || !newMember.email) {
        //! use return to avoid err => headers already sent, or use else statement to avoid err
        return res.status(400).json({ message: 'Please include name and email' });
    }

    members.push(newMember);
    res.json(members);
});

// PUT (update) member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ message: 'Member updated', member });
            }
        });
    } else {
        res.status(400).json({ message: `No member with id ${req.params.id}` });
    }

});

//DELETE member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({ message: `Member deleted`, members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ message: `No member with id ${req.params.id}` });
    }

});

module.exports = router;