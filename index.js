const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger')
const members = require('./Members')
const app = express();
//!
//?
//*
//TODO 


//* this is to use middleware stuff
app.use(logger);

//* Handlebars middleware
//? WTF?? it does something I guess
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

//* Body Parser middleware
//? Used so POST method would respond with request body?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//* Homepage route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App',
        members
    });
});

//* set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//* Members API routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});