const express = require('express');
const path = require('path');
const app = express();
//!
//?
//*
//TODO 

const members = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        status: 'active'
    },
    {
        id: 2,
        name: 'Bob Williams',
        email: 'bob@gmail.com',
        status: 'inactive'
    },
    {
        id: 3,
        name: 'Shannon Jackson',
        email: 'shannon@gmail.com',
        status: 'active'
    }
];

//* simple REST API that returns JSON
// Gets all members
app.get('/api/members', (req, res) => {
    //! no need to use JSON.stringify, express takes care of it
    res.json(members);
});

//* set a static folder
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});