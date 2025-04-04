"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forceDatabaseRefresh = false;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var express_1 = require("express");
var index_js_1 = require("./routes/index.js");
var index_js_2 = require("./models/index.js");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3001;
// Serves static files in the entire client's dist folder
app.use(express_1.default.static('../client/dist'));
app.use(express_1.default.json());
app.use(index_js_1.default);
index_js_2.sequelize.sync({ force: forceDatabaseRefresh }).then(function () {
    app.listen(PORT, function () {
        console.log("Server is listening on port ".concat(PORT));
    });
});
