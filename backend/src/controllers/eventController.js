import Event from "../models/event.js";


const getEvents = async (req, res) => {
    try {
        let user = req.user;
        if(!user) {
            return res.status(401).json({message:"User not authenticated"});
        }
        const events = await Event.find({user:user.email});
        res.json(events);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addEvent = async (req, res) => {
    console.log("body ",req.body)
    let user = req.user;
    if(!user) {
        return res.status(401).json({message:"User not authenticated"});
    }
    const event = new Event({
        event: req.body.event,
        user: user.email
    });
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteEvent = async (req, res) => {
    try {
        let user = req.user;
        if(!user) {
            return res.status(401).json({message:"User not authenticated"});
        }
        const event = await Event.findById(req.params._id);
        if (!event) {
            return res.status(404).json({message: 'Event not found'});
        }
        if (event.user !== user.email && !user.isAdmin) {
            return res.status(401).json({message: 'User not authorized'});
        }
        const response = await Event.deleteOne({_id: req.params._id});
        res.json({message: 'Event deleted'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


export default {
    getEvents,
    addEvent,
    deleteEvent
}