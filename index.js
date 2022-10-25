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

//* set a static folder
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});