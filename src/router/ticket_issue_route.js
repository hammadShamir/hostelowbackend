const TicketIssueRouter = require("express").Router();
const TicketIssueController = require("../controller/ticket_issue_controller");
const { check } = require("express-validator");


// Add Ticket
TicketIssueRouter.post(
    "/hostel/ticket",
    [
        check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
        check("roomId", "Please Enter Room ID").not().isEmpty().trim().escape(),
        check("userId", "Please Enter User ID").not().isEmpty().trim().escape(),
        check("email", "Please Enter Your Email").not().isEmpty().trim().escape(),
        check("ticketIssue", "Please Enter your Issue").not().isEmpty().trim().escape(),
    ],
    TicketIssueController.createTicket
);

// Update ticket Status
TicketIssueRouter.put("/hostel/updateTicketStatus",
    [
        check("ticketId", "Please Enter tickedId").not().isEmpty().trim().escape(),
        check("status", "Enter ticket status").not().isEmpty().trim().escape(),
    ],
    TicketIssueController.updateTicketStatus);

// Fetch ticket by either user or hostel
TicketIssueRouter.get("/hostel/ticket", TicketIssueController.fetchTicket);

// delete ticket by ticket id
TicketIssueRouter.delete("/hostel/ticket",
    [
        check("ticketId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),

    ],
    TicketIssueController.deleteTicket);

module.exports = TicketIssueRouter;
