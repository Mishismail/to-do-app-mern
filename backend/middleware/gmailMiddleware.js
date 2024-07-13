const asyncHandler = require('express-async-handler');

// Middleware to check if user's email ends with '@gmail.com'
const gmailMiddleware = asyncHandler(async (req, res, next) => {
    // Assume req.user is populated by the authentication middleware
    const user = req.user;

    if (!user || !user.email.endsWith('@gmail.com')) {
        res.status(403);
        throw new Error('Forbidden: Only @gmail.com users are allowed');
    }
    next();
});

module.exports = gmailMiddleware;