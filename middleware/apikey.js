const config = require('../config');

module.exports = function apiKeyMiddleware(req, res, next) {
    const { token } = req.headers;
    const { key } = req.query;
    // console.log(token, config.api.key);
    if(token !== config.api.key && key !== config.api.key) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
    next();
};