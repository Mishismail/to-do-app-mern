const asyncHandler = require('express-async-handler');

const gmailMiddleware = asyncHandler(async (req, res, next) => {
    if (!req.user.email.endsWith('@gmail.com')) {
        res.status(403);
        throw new Error('Forbidden: Only @gmail.com users are allowed');
    }
    next();
});

const contentMiddleware = asyncHandler(async (req, res, next) => {
    if (!req.is('application/json')) {
        res.status(400);
        throw new Error('Invalid content type');
    }
    next();
});

const taskLengthMiddleware = asyncHandler(async (req, res, next) => {
    if (req.body.text && req.body.text.length > 140) {
        res.status(400);
        throw new Error('Task text exceeds 140 characters');
    }
    next();
});

module.exports = {
    gmailMiddleware,
    contentMiddleware,
    taskLengthMiddleware,
};