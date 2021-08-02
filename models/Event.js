const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

//Solo para Verlo, NO CAMBIA NADA EN LA BASE DE DATOS
// EventSchema.method('toJSON', function(){
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;

//     return object;
// });

// OJO Mongo agrega la terminacion "S" en el nombre del modelo
module.exports = model('Event', EventSchema);