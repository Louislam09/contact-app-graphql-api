const mongoose = require('mongoose')
const { groupSchema } = require('./schemas');

module.exports = mongoose.model('Group', groupSchema)