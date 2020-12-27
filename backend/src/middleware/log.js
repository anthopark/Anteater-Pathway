const logRequest = (req, res, next) => {
    console.log(`${req.method} Reqeust to '${req.url}' from '${req.headers.origin}'`);
    next();
}

module.exports = logRequest;