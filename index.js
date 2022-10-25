const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')
const members = require('./Members');
const app = express();
//!
//?
//*
//TODO 


//* this is to use middleware stuff
app.use(logger);

//* simple REST API that returns JSON
// Gets all members
app.get('/api/members', (req, res) => {
    //! no need to use JSON.stringify, express takes care of it
    res.json(members);
});

// GET single member
app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        //* req.params.stuff lets reach to request parameters
        //! parseInt is used because req.params returns a string and we use ===
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ message: `No member with id ${req.params.id}` });
    }

});

//* set a static folder
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});