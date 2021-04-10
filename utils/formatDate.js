const moment = require('moment');


module.exports = (date) => {
    let timestamp = moment(date).format('MMMM Do YYYY, h:mm:ss a');
    return timestamp;
};