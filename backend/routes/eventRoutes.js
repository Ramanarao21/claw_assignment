const router = require("express").Router()
const {deleteEvent, updateEvent, getEvents, addEvent, getEvent} = require("../controllers/eventController")
const fetchUser = require("../middlewares/fetchUser")

router.post("/events",fetchUser, addEvent)
router.get("/events",fetchUser,getEvents)
router.get("/event/:id", fetchUser, getEvent)
router.put('/events/:id',fetchUser, updateEvent)
router.delete('/events/:id',fetchUser,deleteEvent)
module.exports = router