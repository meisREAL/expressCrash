const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')
const app = express();
//!
//?
//*
//TODO 


//* this is to use middleware stuff
app.use(logger);


//* set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//* Members API routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});