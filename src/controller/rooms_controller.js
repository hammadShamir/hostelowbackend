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


    updateRoomByID: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: 'All fields are required' });
            }

            const { roomId } = req.body;

            const foundRoom = await RoomModel.findOne({ _id: roomId });
            if (!foundRoom) {
                return res.status(404).json({ message: 'Room not found' });
            }

            const updateRoom = await RoomModel.findOneAndUpdate({ _id: roomId },
                {
                    type: req.body.type,
                    price: req.body.price,
                    beds: req.body.beds,
                    desc: req.body.desc,
                    discountPrice: req.body.discountPrice,
                    images: req.body.images,
                    amenitities: req.body.amenitities,
                    availability: req.body.availability,
                    occupancy: req.body.occupancy
                }, { new: true });

            return res.status(200).json({ message: 'Room updated successfully'});

        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: "Internal Server Error" });

        }
    },

    getAllRooms: async (req, res) => {
        try {
            const rooms = await RoomModel.find();
            res.status(200).json({ rooms });
        } catch (error) {
            return res.status(500).send({ error: "Internal Server Error" });
        }
    },

    getAllRoomsByHostelId: async (req, res) => {
        try {
            const { hostelId } = req.params;
            const rooms = await RoomModel.find({ hostelId: hostelId });
            if (rooms) {
                res.status(200).json({ rooms });
            } else {
                res.status(400).json({ message: 'No Rooms Found' });
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error", message: error });
        }
    },
};

module.exports = roomsController;
