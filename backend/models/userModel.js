const mongoose = require("mongoose");

const schema = new mongoose.Schema({
     username: 'string',
     mail: 'string',
     
     password: 'string',
    });
const user = mongoose.model('user', schema);


module.exports = user;