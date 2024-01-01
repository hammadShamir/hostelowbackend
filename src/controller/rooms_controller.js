const RoomModel = require("../models/room_model");
const { validationResult } = require("express-validator");

const roomsController = {
    addOrUpdateRooms: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: 'All fields are required' });
            }
            const rooms = req.body;
            await RoomModel.insertMany(rooms);
            res.status(200).json({ message: 'Rooms added successfully' });
        } catch (error) {
            return res.status(500).send({ error: "Internal Server Error" });
        }
    },
};

module.exports = roomsController;
