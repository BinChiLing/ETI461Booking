var express = require('express');
const Hotel = require('../models/Hotel');
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms } = require('../controllers/hotel');
const {verifyAdmin} = require("../routes/utils/verifyToken.js")

var router = express.Router();

// CREATE
router.post("/:id", verifyAdmin, createHotel);

// UPDATE
router.put("/", verifyAdmin, updateHotel);

// DELETE

router.delete("/:id", deleteHotel);


//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);


module.exports = router;
