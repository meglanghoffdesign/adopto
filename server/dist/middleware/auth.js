"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader); // Log the received header
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        console.log('Extracted Token:', token); // Log the extracted token
        var secretKey = process.env.JWT_SECRET_KEY || 'handsome';
        jsonwebtoken_1.default.verify(token, secretKey, function (err, user) {
            if (err) {
                console.error('JWT Verification Failed:', err.message); // Log JWT errors
                return res.sendStatus(403); // Forbidden
            }
            console.log('Verified User:', user); // Log the verified user
            req.user = user;
            return next();
        });
    }
    else {
        console.error('No Auth Header - Sending 401');
        res.sendStatus(401); // Unauthorized
    }
};
exports.authenticateToken = authenticateToken;
