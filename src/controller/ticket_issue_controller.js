const ticketIssueModel = require("../models/ticket_issue_model");
const { validationResult } = require("express-validator");

// Ticket Issue Controller
const ticketIssueController = {

    // Create Ticket
    createTicket: async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .send({ error: errors.array().map((err) => err.msg)[0] });
            }

            else {
                const { email, hostelId, roomId, ticketIssue, userId, hostelName } = req.body;
                const newticketIssue = await ticketIssueModel.create({
                    email: email,
                    hostelId: hostelId,
                    ticketIssue: ticketIssue,
                    roomId: roomId,
                    userId: userId,
                    hostelName: hostelName,
                });

                return res.json({ data: newticketIssue, message: "Ticket Created" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },


    // Fetch Tickets with Pagination
    fetchTicket: async function (req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            let query = {};

            if (req.body.hostelId) {
                query.hostelId = req.body.hostelId;
            } else if (req.body.userId) {
                query.userId = req.body.userId;
            }

            const requestData = await ticketIssueModel
                .find(query)
                .skip(skip)
                .limit(limit);

            return res.json({
                success: true,
                data: requestData,
                message: "Tickets Issues retrieved successfully",
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(requestData.length / limit),
                    totalItems: requestData.length,
                },
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateTicketStatus: async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .send({ error: errors.array().map((err) => err.msg)[0] });
            }
            const { ticketId, status, ticketIssue } = req.body;
            const ticket = await ticketIssueModel.findById(ticketId);

            if (!ticket) {
                return res.status(404).json({ message: "Ticket not found" });
            }

            await ticketIssueModel.findOneAndUpdate({ _id: ticketId }, { status: status, ticketIssue: ticketIssue });
            return res.json({ message: "Ticket status updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    deleteTicket: async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .send({ error: errors.array().map((err) => err.msg)[0] });
            }
            const { ticketId } = req.body;
            await ticketIssueModel.findByIdAndDelete(ticketId);
            return res.status(200).json({ message: "Ticket Deleted" });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = ticketIssueController;