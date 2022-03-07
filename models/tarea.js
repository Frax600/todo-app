var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/User.js');
var TareaSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    publicationdate: { type: Date, default: Date.now },
    hecho: {type: Boolean, default: false}
});
module.exports = mongoose.model('Tarea', TareaSchema);