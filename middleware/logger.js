const moment = require('moment');

//* simple middleware function
//! next always comes as last parameter
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;