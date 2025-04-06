"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ticket_routes_js_1 = require("./ticket-routes.js");
var user_routes_js_1 = require("./user-routes.js");
var router = (0, express_1.Router)();
router.use('/tickets', ticket_routes_js_1.ticketRouter);
router.use('/users', user_routes_js_1.userRouter);
exports.default = router;
