import express from 'express';
import eventController from './controllers/eventController.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API eventos');
});

app.get('/favorites', (req, res) => {
    eventController.getEvents(req, res);
});

app.post('/favorites', (req, res) => {
    eventController.addEvent(req, res);
});

app.delete('/favorites/:_id', (req, res) => {
    eventController.deleteEvent(req, res);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);