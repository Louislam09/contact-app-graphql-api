const mongoose = require('mongoose')
const { contactSchema } = require('./schemas');

module.exports = mongoose.model('Contact', contactSchema)