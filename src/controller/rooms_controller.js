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
            const addedRooms = await RoomModel.insertMany(rooms);
            res.status(200).json({ message: 'Rooms added successfully', ...addedRooms });
        } catch (error) {
            return res.status(500).send({ error: "Internal Server Error" });
        }
    },

    deleteRoomById: async (req, res) => {
        try {
            const { id } = req.body;
            const foundRoom = await RoomModel.findById(id);
            if (!foundRoom) {
                return res.status(404).json({ message: 'Room not found' });
            }

            await RoomModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Room deleted successfully' });

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

            const { type, price, beds, desc, discountPrice, images, amenitities, availability, occupancy, roomId } = req.body;

            const foundRoom = await RoomModel.findOne({ _id: roomId });
            if (!foundRoom) {
                return res.status(404).json({ message: 'Room not found' });
            }

            const updatedRoom = await RoomModel.findOneAndUpdate({ _id: roomId },
                {
                    type: type,
                    price: price,
                    beds: beds,
                    desc: desc,
                    discountPrice: discountPrice,
                    images: images,
                    amenitities: amenitities,
                    availability: availability,
                    occupancy: occupancy
                }, { new: true });

            return res.status(200).json({ message: 'Room updated successfully', ...updatedRoom });

        } catch (error) {
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
