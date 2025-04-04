"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
var express_1 = require("express");
var ticket_controller_js_1 = require("../../controllers/ticket-controller.js");
var router = express_1.default.Router();
exports.ticketRouter = router;
// GET /tickets - Get all tickets
router.get('/', ticket_controller_js_1.getAllTickets);
// GET /tickets/:id - Get a ticket by id
router.get('/:id', ticket_controller_js_1.getTicketById);
// POST /tickets - Create a new ticket
router.post('/', ticket_controller_js_1.createTicket);
// PUT /tickets/:id - Update a ticket by id
router.put('/:id', ticket_controller_js_1.updateTicket);
// DELETE /tickets/:id - Delete a ticket by id
router.delete('/:id', ticket_controller_js_1.deleteTicket);
