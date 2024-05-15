const mongoose = require('mongoose')
// const autoIncrement = require('mongoose-auto-increment');

// var connection = mongoose.createConnection("mongodb://127.0.0.1:27017/NurserySystem");
 
// autoIncrement.initialize(connection);

const classSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, require: true },
    supervisor: { type: mongoose.ObjectId, ref: 'Teachers' },
    children: { type: Array, ref: 'Children' }
});

// classSchema.plugin(autoIncrement.plugin, 'Classes');
module.exports = mongoose.model('Classes', classSchema)

