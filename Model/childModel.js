const mongoose = require('mongoose')

const childSchema = new mongoose.Schema({
    _id: Number,
    fullName: { type: String, require: true },
    age: Number,
    level: { type: String, enum: ['PreKG', 'KG1', 'KG2'] },
    address: {
        city: String,
        street: String,
        building: Number,
    }
});
 
module.exports = mongoose.model('Children', childSchema)



