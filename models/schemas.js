const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    groups: [String],
    isFav: Boolean
})

const groupSchema = new Schema({
    name: String,
    members: [String]
})

module.exports = {
    groupSchema,
    contactSchema
}