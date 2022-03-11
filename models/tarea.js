var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User.js');
var TareaSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    nombre: { type: String, required: true },
    creationdate: { type: Date, default: Date.now },
    hecho: {type: Boolean, default: false}
});
module.exports = mongoose.model('Tarea', TareaSchema);