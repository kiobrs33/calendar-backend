const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name email');

    res.status(200).json({
        ok: true,
        msg: 'Get Events!',
        events
    })
}

const createEvent = async (req, res = response) => {
    try {
        const event = new Event(req.body);

        // Este ese obtiene del TOKEN VALIDADO
        event.user = req.uid;

        const eventSaved = await event.save();

        res.status(201).json({
            ok: true,
            msg: 'Create Event!',
            event: eventSaved
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Event not Created!'
        })
    }
}

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );

        //Validando la existencia del EVENTO
        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe con es ID!',
            });
        }

        //Validando el Dueño del EVENTO
        if( event.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este documento',
            });
        }

        const beforeEvent = {
            ...req.body,
            user: req.uid,
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, beforeEvent, {new: true} );

        res.status(201).json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador!',
        });
    }
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );

        //Validando la existencia del EVENTO
        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe con es ID!',
            });
        }

        //Validando el Dueño del EVENTO
        if( event.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este documento',
            });
        }

        await Event.findByIdAndDelete(eventId );

        res.status(201).json({
            ok: true,
            msg: 'Evento eliminado!'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador!',
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}