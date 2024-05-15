const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    _id: { type: mongoose.ObjectId, auto: true },
    fullname: { type: String, require: true },
    password: { type: String },
    email: { type: String, unique: true },
    image: String,
    supervisor: { type: Boolean, default: false },
    role: { type: String, default: 'teacher', enum: ['teacher', 'admin'] },
});

module.exports = mongoose.model('Teachers', teacherSchema);