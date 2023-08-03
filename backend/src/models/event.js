import connection from '../db/mongoose.js';


const EventSchema = new connection.Schema({
    event: {
        type:Object,
        required:true
    },
    user: {
        type:String,
        required:true
    }
})

const Event = connection.model('Event', EventSchema);

export default Event;