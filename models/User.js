const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// OJO Mongo agrega la terminacion "S" en el nombre del modelo
module.exports = model('User', UserSchema);