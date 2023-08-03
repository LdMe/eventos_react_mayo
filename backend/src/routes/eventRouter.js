import { Router } from "express";
import eventController from "../controllers/eventController.js";

const router = Router();

router.get('/favorites', (req, res) => {
    eventController.getEvents(req, res);
});

router.post('/favorites', (req, res) => {
    eventController.addEvent(req, res);
});

router.delete('/favorites/:_id', (req, res) => {
    eventController.deleteEvent(req, res);
});

export default router;
