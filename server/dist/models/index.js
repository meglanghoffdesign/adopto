"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = exports.User = exports.sequelize = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var sequelize_1 = require("sequelize");
var user_js_1 = require("./user.js");
var ticket_js_1 = require("./ticket.js");
var sequelize = process.env.DB_URL
    ? new sequelize_1.Sequelize(process.env.DB_URL)
    : new sequelize_1.Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
exports.sequelize = sequelize;
var User = (0, user_js_1.UserFactory)(sequelize);
exports.User = User;
var Ticket = (0, ticket_js_1.TicketFactory)(sequelize);
exports.Ticket = Ticket;
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
