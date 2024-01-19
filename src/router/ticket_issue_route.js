const TicketIssueRouter = require("express").Router();
const TicketIssueController = require("../controller/ticket_issue_controller");
const { check } = require("express-validator");

TicketIssueRouter.post(
    "/hostel/ticket",
    [
        check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
        check("email", "Please Enter Your Email").not().isEmpty().trim().escape(),
        check("ticketIssue", "Please Enter your Issue").not().isEmpty().trim().escape(),
    ],
    TicketIssueController.createTicket
);


TicketIssueRouter.post("/hostel/ticket", TicketIssueController.createTicket);
TicketIssueRouter.get("/hostel/ticket", TicketIssueController.fetchTicket);
TicketIssueRouter.put("/hostel/updateTicketStatus",
    [
        check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
        check("status", "Please Enter Your Email").not().isEmpty().trim().escape(),
    ],
    TicketIssueController.updateTicketStatus);

module.exports = TicketIssueRouter;
